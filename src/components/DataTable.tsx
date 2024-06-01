import React, {useEffect, useState} from 'react';
import {Table, Checkbox, Button, Group} from '@mantine/core';
import axios from 'axios';
import {convertDateTime} from "../utils/utils.ts";
import {useAppSelector} from "../store";


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
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>
                        <Checkbox aria-label="Select row"/>
                    </Table.Th>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Created Date</Table.Th>
                    <Table.Th>Action</Table.Th>
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
                        <Group>
                            <Button radius='xl' variant="gradient"
                                    gradient={{from: 'indigo', to: 'cyan', deg: 145}}>Run</Button>
                            <Button color='red' radius='xl' variant="gradient"
                                    gradient={{from: 'grape', to: 'red', deg: 360}}>Delete</Button>
                        </Group>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
        </Table>
    );
}