import {useDisclosure, useTimeout} from '@mantine/hooks';
import {Dialog, Notification, Text} from '@mantine/core';
import {useAppSelector} from "../store";
import {useEffect} from "react";

export default function DialogMessage() {
    const dialogState = useAppSelector(state => state.dialog);
    const [dialogOpened, dialogCtl] = useDisclosure(false);
    const closeDialogTimer = useTimeout(() => dialogCtl.close(), 11000);
    const reOpenDialogTimer = useTimeout(() => {
        dialogCtl.open()
        closeDialogTimer.clear()
        closeDialogTimer.start()
    }, 500);
    useEffect(() => {
        if (dialogState.id) {
            if (dialogOpened) {
                dialogCtl.close();
                reOpenDialogTimer.start()
            } else {
                dialogCtl.open();
                closeDialogTimer.start()
            }
        }
    }, [dialogState]);

    return (
        <>
            <Dialog opened={dialogOpened} onClose={dialogCtl.close} size="lg" radius="md" withBorder={false} p={0}>
                <Notification color={dialogState.status === 'Success' ? 'blue' : 'red'}
                              withCloseButton={false} withBorder>
                    <Text fw={700}>{dialogState.message}</Text>
                </Notification>
            </Dialog>
        </>
    );
}