import {ActionIcon, Group, Modal, Stack, Text} from "@mantine/core";
import {IconCircleCheck, IconXboxX} from "@tabler/icons-react";
import {useAppDispatch} from "../../store";
import {showNotification} from "../../utils/utils.ts";
import {invoke} from "@tauri-apps/api";
import scriptSlice from "../../store/script-slice.ts";

interface DeleteModalProp {
    close: () => void;
    opened: boolean;
    scriptId: number;
}

export default function DeleteModal({close, opened, scriptId}: DeleteModalProp) {
    const dispatch = useAppDispatch()

    async function handleClickConfirm() {
        await invoke('delete_scripts', {
            scriptIds: [scriptId]
        });
        dispatch(scriptSlice.actions.changeTotal(-1));
        close();
        showNotification('Deleted')
    }

    return (
        <Modal opened={opened} onClose={close} withCloseButton={false} closeOnEscape={false}
               closeOnClickOutside={false}>
            <Stack align='center'>
                <Text fw={700}>Do you want to delete <Text span fw={900} c='red'>Script {scriptId}</Text> ?</Text>
                <Group justify='center'>
                    <ActionIcon variant='subtle' color='green' radius='xl'
                                onClick={handleClickConfirm}><IconCircleCheck/></ActionIcon>
                    <ActionIcon variant='subtle' color='red' radius='xl' onClick={close}><IconXboxX/></ActionIcon>
                </Group>
            </Stack>
        </Modal>
    )
}