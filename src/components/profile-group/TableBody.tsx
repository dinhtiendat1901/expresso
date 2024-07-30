import {ActionIcon, Badge, Table} from "@mantine/core";
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
                    <Table.Td><Badge color={profileGroup.color}>{profileGroup.name}</Badge></Table.Td>
                    <Table.Td>
                        {profileGroup.id !== '4a988770-cbd9-4b18-99ed-b94343b206a5' &&
                            <ActionIcon variant='subtle' color='red' pl='5' pr='5' onClick={() => {
                                handleClickDelete(profileGroup.id)
                            }}><IconTrash
                                size={21}/></ActionIcon>}
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
            <DeleteModal opened={deleteModalOpened} close={deleteModalCtl.close} profileGroupId={deleteProfileGroup}/>
        </>
    )
}