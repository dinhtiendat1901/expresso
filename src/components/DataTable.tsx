import React, {useEffect, useState} from 'react';
import {Table, Checkbox, Button} from '@mantine/core';
import axios from 'axios';
import {convertDateTime} from "../utils/utils.ts";
import {useAppSelector} from "../store";
import {IconPlayerPlay, IconSettings, IconTrash} from "@tabler/icons-react";
import {useListState} from "@mantine/hooks";


interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
}

interface CheckboxItem {
    checked: boolean;
    key: number
}


export default function DataTable() {
    console.log('render')
    const pageState = useAppSelector(state => state.page);
    const [data, setData] = useState<Profile[]>([]);
    const [listCheckboxItems, checkboxHandlers] = useListState<CheckboxItem>([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://127.0.0.1:8000/profiles', {
                params: {
                    skip: (pageState.currentPage - 1) * pageState.pageLimit,
                    limit: pageState.pageLimit
                }
            });
            setData(response.data)
            checkboxHandlers.setState([])
            response.data.map((profile: Profile) => {
                checkboxHandlers.append({checked: false, key: profile.id})
            })

        }

        fetchData().then()
    }, [pageState]);

    const allChecked = listCheckboxItems.every((value) => value.checked);
    console.log(listCheckboxItems)
    const indeterminate = listCheckboxItems.some((value) => value.checked) && !allChecked;


    return (
        <Table withRowBorders={false} highlightOnHover withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={50}>
                        <Checkbox
                            checked={allChecked}
                            indeterminate={indeterminate}
                            onChange={() =>
                                checkboxHandlers.setState((current) =>
                                    current.map((value) => ({...value, checked: !allChecked}))
                                )
                            }
                        />
                    </Table.Th>
                    <Table.Th w={50}>ID</Table.Th>
                    <Table.Th w={'20%'}>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th w={300}>Created Date</Table.Th>
                    <Table.Th w={250}>Action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{data.map((profile, index) => (
                <Table.Tr
                    key={profile.id}
                    bg={listCheckboxItems[index].checked ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td>
                        <Checkbox
                            aria-label="Select row"
                            checked={listCheckboxItems[index].checked}
                            key={listCheckboxItems[index].key}
                            onChange={(event) => checkboxHandlers.setItemProp(index, 'checked', event.currentTarget.checked)}
                        />
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