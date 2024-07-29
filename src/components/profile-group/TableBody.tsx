import {ActionIcon, Table, Text} from "@mantine/core";
import React, {useState} from "react";
import {useAppSelector} from "../../store";
import {IconTrash} from "@tabler/icons-react";

import {useDisclosure} from "@mantine/hooks";
import DeleteModal from "./DeleteModal.tsx";


export default function TableBody() {
    const listProfileGroups = useAppSelector(state => state.profileGroup.listProfileGroups);

    const [deleteModalOpened, deleteModalCtl] = useDisclosure(false);
    const [deleteProfileGroup, setDeleteProfileGroup] = useState('');


    function handleClickDelete(id: string) {
        setDeleteProfileGroup(id);
        deleteModalCtl.open()
    }


    return (
        <>
            <Table.Tbody>{listProfileGroups.map((profileGroup) => (
                <Table.Tr key={profileGroup.id}>
                    <Table.Td><Text fw={700}>{profileGroup.name}</Text></Table.Td>
                    <Table.Td>
                        <ActionIcon variant='subtle' color='red' pl='5' pr='5' onClick={() => {
                            handleClickDelete(profileGroup.id)
                        }}><IconTrash
                            size={21}/></ActionIcon>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
            <DeleteModal opened={deleteModalOpened} close={deleteModalCtl.close} profileGroupId={deleteProfileGroup}/>
        </>
    )
}