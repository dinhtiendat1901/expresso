import {Button, Group, Modal, Stack, Text} from "@mantine/core";
import ScriptComboBox from "../search-area/ScriptComboBox.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import {fetch, ResponseType} from "@tauri-apps/api/http";
import pageSlice from "../../../store/page-slice.ts";
import classes from "../../../css/Modal.module.css";
import {useForm} from "@mantine/form";

interface RunModalProp {
    close: () => void;
    opened: boolean;
}

interface FormValue {
}

const initialValues: FormValue = {}

export default function RunModal({close, opened}: RunModalProp) {
    const dispatch = useAppDispatch()
    const listProfiles = useAppSelector(state => state.profile.listProfiles);
    const listScripts = useAppSelector(state => state.script.listScripts);
    const [selectedScriptId, setSelectedScriptId] = useState('');
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {},
    });

    async function handleClickRunScript() {
        dispatch(pageSlice.actions.changeScriptRunning())
        const listRunProfiles = listProfiles.filter(profile => profile.checked === true).map(profile => {
            return {
                id: profile.id,
                path: profile.path
            }
        })
        const script = listScripts.find(script => script.id === selectedScriptId);
        await fetch<string>(`${import.meta.env.VITE_PUPPETEER_SERVER_URL}/run-job`, {
            method: 'POST',
            timeout: 30,
            body: {
                type: 'Json',
                payload: {
                    script,
                    listRunProfiles
                }
            },
            responseType: ResponseType.Text
        });
        form.reset();
        close();
    }

    return (
        <Modal opened={opened} closeOnClickOutside={false} title='Run Script' classNames={{
            title: classes.title
        }} onClose={() => {
            form.reset();
            close();
        }}>
            <form onSubmit={form.onSubmit(handleClickRunScript)}>
                <Stack>
                    <ScriptComboBox setScriptId={setSelectedScriptId} canClear={false}/>
                </Stack>
                <Group justify="flex-end" mt="md">
                    <Button type="submit"><Text fw={700}>Run</Text></Button>
                </Group>
            </form>
        </Modal>
    )

}