import {ActionIcon, Box, Group, LoadingOverlay} from "@mantine/core";
import {IconPlayerTrackNext, IconScript} from "@tabler/icons-react";
import ScriptComboBox from "./ScriptComboBox.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {fetch, ResponseType} from "@tauri-apps/api/http";
import pageSlice from "../../store/page-slice.ts";

export default function RunScript() {
    const dispatch = useAppDispatch()
    const listProfiles = useAppSelector(state => state.profile.listProfiles);
    const [selectedScriptPath, setSelectedScriptPath] = useState('');
    const profileSelected = listProfiles.some((value) => value.checked)

    async function handleClickRunScript() {
        dispatch(pageSlice.actions.changeScriptRunning())
        const listProfilePaths = listProfiles.filter(profile => profile.checked === true).map(profile => profile.path)
        await fetch<string>(`${import.meta.env.VITE_PUPPETEER_SERVER_URL}/run-job`, {
            method: 'POST',
            timeout: 30,
            body: {
                type: 'Json',
                payload: {
                    scriptPath: selectedScriptPath,
                    listProfilePaths: listProfilePaths
                }
            },
            responseType: ResponseType.Text
        });
    }

    return <Box pos='relative'>
        <LoadingOverlay visible={!profileSelected} zIndex={1000} overlayProps={{radius: "sm", blur: 0}} loaderProps={{
            type: null
        }}/>
        <Group>
            <Group>
                <IconScript/>
                <ScriptComboBox setScriptPath={setSelectedScriptPath}/>
            </Group>
            <ActionIcon variant="light" size={37} radius='xl' onClick={handleClickRunScript}>
                <IconPlayerTrackNext style={{width: '60%', height: '60%'}} stroke={3}/>
            </ActionIcon>
        </Group>
    </Box>
}