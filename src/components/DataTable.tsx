import React, {useEffect, useState} from 'react';
import {Table, Checkbox, Button, Group} from '@mantine/core';
import axios from 'axios';
import {convertDateTime} from "../utils/utils.ts";
import {useAppSelector} from "../store";
import {IconPhoto, IconPlayerPlay, IconSettings, IconTrash} from "@tabler/icons-react";


interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
}


export default function DataTable() {
    const pageState = useAppSelector(state => state.page);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [data, setData] = useState<Profile[]>([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://127.0.0.1:8000/profiles', {
                params: {
                    skip: (pageState.currentPage - 1) * pageState.pageLimit,
                    limit: pageState.pageLimit
                }
            });
            setData(response.data)
        }

        fetchData().then()
    }, [pageState]);


    return (
        <Table withRowBorders={false} highlightOnHover withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={50}>
                        <Checkbox aria-label="Select row"/>
                    </Table.Th>
                    <Table.Th w={50}>ID</Table.Th>
                    <Table.Th w={'20%'}>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th w={300}>Created Date</Table.Th>
                    <Table.Th w={250}>Action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{data.map((profile) => (
                <Table.Tr
                    key={profile.id}
                    bg={selectedRows.includes(profile.id) ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td>
                        <Checkbox
                            aria-label="Select row"
                            checked={selectedRows.includes(profile.id)}
                            onChange={(event) =>
                                setSelectedRows(
                                    event.currentTarget.checked
                                        ? [...selectedRows, profile.id]
                                        : selectedRows.filter((id) => id !== profile.id)
                                )}/>
                    </Table.Td>
                    <Table.Td>{profile.id}</Table.Td>
                    <Table.Td>{profile.name}</Table.Td>
                    <Table.Td>{profile.description}</Table.Td>
                    <Table.Td>{convertDateTime(profile.created_date)}</Table.Td>
                    <Table.Td>
                        <Button.Group>
                            <Button variant='subtle' pl='5' pr='5'>
                                <IconPlayerPlay size={21}/>
                            </Button>
                            <Button variant='subtle' pl='5' pr='5' color='black'><IconSettings size={21}/></Button>
                            <Button variant='subtle' color='red' pl='5' pr='5'><IconTrash size={21}/></Button>
                        </Button.Group>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
        </Table>
    );
}