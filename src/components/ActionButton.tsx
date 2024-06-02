import {Button, Modal, Stack, Text} from "@mantine/core";
import {IconCirclePlus, IconFileExport, IconFileSpreadsheet} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateForm from "./CreateForm.tsx";

export default function ActionButton() {
    const [opened, {open, close}] = useDisclosure(false);
    return (
        <>
            <Stack>
                <Button leftSection={<IconCirclePlus size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"
                        onClick={open}><Text
                    size='19'>Create</Text></Button>
                <Button leftSection={<IconFileSpreadsheet size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"><Text
                    size='19'>Import from Excel</Text></Button>
                <Button leftSection={<IconFileExport size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"><Text
                    size='19'>Export</Text></Button>
            </Stack>
            <Modal opened={opened} onClose={close}>
                <CreateForm close={close}/>
            </Modal>
        </>);
}