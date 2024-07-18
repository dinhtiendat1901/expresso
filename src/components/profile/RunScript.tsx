import {ActionIcon, Group} from "@mantine/core";
import {IconPlayerTrackNext} from "@tabler/icons-react";
import ScriptComboBox from "./ScriptComboBox.tsx";
import {useState} from "react";
import {useAppSelector} from "../../store";
import {fetch, ResponseType} from "@tauri-apps/api/http";

export default function RunScript() {
    const listProfiles = useAppSelector(state => state.profile.listProfiles);
    const [selectedScriptPath, setSelectedScriptPath] = useState('');

    async function handleClickRunScript() {
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

    return <Group>
        <ScriptComboBox setScriptPath={setSelectedScriptPath}/>
        <ActionIcon variant="light" size={37} radius='xl' onClick={handleClickRunScript}>
            <IconPlayerTrackNext style={{width: '60%', height: '60%'}} stroke={3}/>
        </ActionIcon>
    </Group>
}