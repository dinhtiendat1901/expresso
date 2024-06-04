import {Button, Checkbox, Table} from "@mantine/core";
import checkboxSlice from "../store/checkbox-slice.ts";
import {convertDateTime} from "../utils/utils.ts";
import {IconPlayerPlay, IconSettings, IconTrash} from "@tabler/icons-react";
import React from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {Profile} from "./DataTable.tsx";
import DeleteModal from "./DeleteModal.tsx";
import {useDisclosure} from "@mantine/hooks";

interface TableBodyProp {
    data: Profile[]
}

export default function TableBody({data}: TableBodyProp) {
    const dispatch = useAppDispatch()
    const checkboxState = useAppSelector(state => state.checkbox.listCheckbox);
    const [deleteModalOpened, deleteModalCtl] = useDisclosure(false);
    return (

        <>
            <Table.Tbody>{data.map((profile, index) => (
                <Table.Tr
                    key={profile.id}
                    bg={checkboxState[index].checked ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td>
                        <Checkbox
                            aria-label="Select row"
                            checked={checkboxState[index].checked}
                            key={checkboxState[index].key}
                            onChange={(event) => dispatch(checkboxSlice.actions.changeCheckbox({
                                key: profile.id,
                                checked: event.currentTarget.checked
                            }))}
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
                            <Button variant='subtle' color='red' pl='5' pr='5' onClick={deleteModalCtl.open}><IconTrash
                                size={21}/></Button>
                        </Button.Group>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
            <DeleteModal opened={deleteModalOpened} close={deleteModalCtl.close}/>
        </>
    )
}