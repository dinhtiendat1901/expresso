import {ActionIcon, Table} from "@mantine/core";
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
                    <Table.Td>{script.id}</Table.Td>
                    <Table.Td>{script.name}</Table.Td>
                    <Table.Td>{script.path}</Table.Td>
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