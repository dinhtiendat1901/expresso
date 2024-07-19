import {ActionIcon, Table, Text} from "@mantine/core";
import React, {useState} from "react";
import {useAppSelector} from "../../store";
import {IconTrash} from "@tabler/icons-react";

import {useDisclosure} from "@mantine/hooks";
import DeleteModal from "./DeleteModal.tsx";


export default function TableBody() {
    const listScripts = useAppSelector(state => state.script.listScripts);

    const [deleteModalOpened, deleteModalCtl] = useDisclosure(false);
    const [deleteScriptId, setDeleteScriptId] = useState(0);


    function handleClickDelete(id: number) {
        setDeleteScriptId(id);
        deleteModalCtl.open()
    }


    return (
        <>
            <Table.Tbody>{listScripts.map((script) => (
                <Table.Tr key={script.id}>
                    <Table.Td><Text fw={700}>{script.id}</Text></Table.Td>
                    <Table.Td><Text fw={700}>{script.name}</Text></Table.Td>
                    <Table.Td><Text fw={700}>{script.path}</Text></Table.Td>
                    <Table.Td>
                        <ActionIcon variant='subtle' color='red' pl='5' pr='5' onClick={() => {
                            handleClickDelete(script.id)
                        }}><IconTrash
                            size={21}/></ActionIcon>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
            <DeleteModal opened={deleteModalOpened} close={deleteModalCtl.close} scriptId={deleteScriptId}/>
        </>
    )
}