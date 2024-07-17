import {ActionIcon, Table} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {invoke} from "@tauri-apps/api";
import scriptSlice, {Script} from "../../store/script-slice.ts";
import {IconTrash} from "@tabler/icons-react";

import {useDisclosure} from "@mantine/hooks";
import DeleteModal from "./DeleteModal.tsx";


export default function TableBody() {
    const dispatch = useAppDispatch()
    const listScripts = useAppSelector(state => state.script.listScripts);
    const totalScript = useAppSelector(state => state.script.total);
    const [deleteModalOpened, deleteModalCtl] = useDisclosure(false);
    const [deleteScriptId, setDeleteScriptId] = useState(0);


    useEffect(() => {
        async function fetchData() {
            const listScripts: Script[] = await invoke('read_scripts', {
                skip: 0,
                limit: 100
            });
            const totalScript: number = await invoke('read_total_scripts')
            dispatch(scriptSlice.actions.setListScripts(listScripts))
            dispatch(scriptSlice.actions.setTotal(totalScript))
        }

        fetchData().then()
    }, [totalScript]);

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