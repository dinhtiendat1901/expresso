import {ActionIcon, Group, Modal, Stack, Text} from "@mantine/core";
import {IconCircleCheck, IconXboxX} from "@tabler/icons-react";
import {useAppDispatch} from "../../store";
import {showNotification} from "../../utils/utils.ts";
import {invoke} from "@tauri-apps/api/core";
import profileGroupSlice from "../../store/profile-group-slice.ts";


interface DeleteModalProp {
    close: () => void;
    opened: boolean;
    groupId: string;
}

export default function DeleteModal({close, opened, groupId}: DeleteModalProp) {
    const dispatch = useAppDispatch()

    async function handleClickConfirm() {
        await invoke('delete_profile_groups', {
            profileGroupIds: [groupId]
        });
        dispatch(profileGroupSlice.actions.changeTotal(-1));
        close();
        showNotification('Deleted')
    }

    return (
        <Modal opened={opened} onClose={close} withCloseButton={false} closeOnEscape={false}
               closeOnClickOutside={false}>
            <Stack align='center'>
                <Text fw={700}>Do you want to delete <Text span fw={900} c='red'>Profile Group {groupId}</Text> ?</Text>
                <Group justify='center'>
                    <ActionIcon variant='subtle' color='green' radius='xl'
                                onClick={handleClickConfirm}><IconCircleCheck/></ActionIcon>
                    <ActionIcon variant='subtle' color='red' radius='xl' onClick={close}><IconXboxX/></ActionIcon>
                </Group>
            </Stack>
        </Modal>
    )
}