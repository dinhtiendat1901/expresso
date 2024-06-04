import {ActionIcon, Group, Modal, Stack, Text} from "@mantine/core";
import {IconCircleCheck, IconXboxX} from "@tabler/icons-react";
import axios from "axios";
import {useAppDispatch} from "../store";
import pageSlice from "../store/page-slice.ts";
import dialogSlice from "../store/dialog-slice.ts";
import {randomId} from "@mantine/hooks";

interface DeleteModalProp {
    close: () => void;
    opened: boolean;
    profileId: number;
}

export default function DeleteModal({close, opened, profileId}: DeleteModalProp) {
    const dispatch = useAppDispatch()

    async function handleClickConfirm() {
        await axios.delete('http://127.0.0.1:8000/profiles', {
            data: [profileId]
        });
        dispatch(pageSlice.actions.changeTotal(-1));
        close();
        dispatch(dialogSlice.actions.pushMessage({
            id: randomId(),
            message: 'Deleted',
            status: 'Success'
        }))
    }

    return (
        <Modal opened={opened} onClose={close} withCloseButton={false} closeOnEscape={false}
               closeOnClickOutside={false}>
            <Stack align='center'>
                <Text>Do you want to delete <Text span fw={700} c='red'>Profile {profileId}</Text> ?</Text>
                <Group justify='center'>
                    <ActionIcon variant='subtle' color='green' radius='xl'
                                onClick={handleClickConfirm}><IconCircleCheck/></ActionIcon>
                    <ActionIcon variant='subtle' color='red' radius='xl' onClick={close}><IconXboxX/></ActionIcon>
                </Group>
            </Stack>
        </Modal>
    )
}