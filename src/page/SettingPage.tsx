import {ActionIcon, Anchor, Flex, Group, Stack, Text} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../store";
import {open} from '@tauri-apps/plugin-dialog';
import {useEffect, useState} from "react";
import {IconDeviceFloppy, IconSquareX} from "@tabler/icons-react";
import {invoke} from "@tauri-apps/api/core";
import ConfigSlice from "../store/config-slice.ts";
import {showNotification} from "../utils/utils.ts";

export default function SettingPage() {
    const dispatch = useAppDispatch()
    const path = useAppSelector(state => state.config.path)
    const [pathIsChanged, setPathIsChanged] = useState(false)
    const [displayPath, setDisplayPath] = useState('')

    useEffect(() => {
        setDisplayPath(path)
    }, [path]);

    async function handleSelectFolder() {
        const selectPath = await open({
            directory: true
        });
        if (selectPath !== path && selectPath) {
            setDisplayPath((selectPath as string).replace(/\\/g, '/'))
            setPathIsChanged(true)
        }

    }

    async function handleSavePath() {
        await invoke('set_config', {
            path: displayPath
        })
        dispatch(ConfigSlice.actions.changePath(displayPath))
        setPathIsChanged(false)
        showNotification('Path is changed')

    }

    function handleCancel() {
        setDisplayPath(path)
        setPathIsChanged(false)
    }

    const actionButton = pathIsChanged ?
        <Group><ActionIcon variant="light" color='green' size={37} radius='xl' onClick={handleSavePath}>
            <IconDeviceFloppy style={{width: '60%', height: '60%'}} stroke={3}/>
        </ActionIcon>
            <ActionIcon variant="light" color='red' size={37} radius='xl' onClick={handleCancel}>
                <IconSquareX style={{width: '60%', height: '60%'}} stroke={3}/>
            </ActionIcon></Group> : undefined

    return <Stack gap='sm'>
        <Flex align='flex-end' gap='md'>
            <Text fw={700}>Path:</Text>
            <Anchor underline="always" onClick={handleSelectFolder} fw={700}>
                {displayPath}
            </Anchor>
            {actionButton}
        </Flex>
    </Stack>
}