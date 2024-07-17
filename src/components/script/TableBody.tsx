import {Table} from "@mantine/core";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {invoke} from "@tauri-apps/api";
import scriptSlice, {Script} from "../../store/script-slice.ts";


export default function TableBody() {
    const dispatch = useAppDispatch()
    const listScripts = useAppSelector(state => state.script.listScripts);


    useEffect(() => {
        fetchData().then()
    }, []);

    async function fetchData() {
        let listScripts: Script[] = await invoke('read_scripts', {
            skip: 0,
            limit: 100
        });
        dispatch(scriptSlice.actions.setListScripts(listScripts))
    }

    return (
        <>
            <Table.Tbody>{listScripts.map((script) => (
                <Table.Tr key={script.id}>
                    <Table.Td>{script.id}</Table.Td>
                    <Table.Td>{script.name}</Table.Td>
                    <Table.Td>{script.path}</Table.Td>
                    <Table.Td>

                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
        </>
    )
}