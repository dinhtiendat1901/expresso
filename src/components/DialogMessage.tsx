import {useDisclosure, useTimeout} from '@mantine/hooks';
import {Dialog, Notification} from '@mantine/core';
import {useAppSelector} from "../store";
import {useEffect} from "react";

export default function DialogMessage() {
    const dialogState = useAppSelector(state => state.dialog);
    const [opened, dialogCtl] = useDisclosure(false);
    const closeDialogTimer = useTimeout(() => dialogCtl.close(), 11000);
    const reOpenDialogTimer = useTimeout(() => {
        dialogCtl.open()
        closeDialogTimer.clear()
        closeDialogTimer.start()
    }, 500);
    useEffect(() => {
        if (dialogState.id) {
            if (opened) {
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
            <Dialog opened={opened} onClose={dialogCtl.close} size="lg" radius="md" withBorder={false} p={0}>
                <Notification color={dialogState.status === 'Success' ? 'blue' : 'red'}
                              title={dialogState.status === 'Success' ? 'Successfully' : 'Failed'}
                              withCloseButton={false} withBorder>
                    {dialogState.message}
                </Notification>
            </Dialog>
        </>
    );
}