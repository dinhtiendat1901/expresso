import {Button, Group, Text} from "@mantine/core";
import {IconCirclePlus, IconFileExport, IconFileSpreadsheet} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateModal from "./CreateModal.tsx";

export default function ActionButton() {
    const [createModalOpened, createModalCtl] = useDisclosure(false);
    return (
        <>
            <Group>
                <Button leftSection={<IconCirclePlus size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"
                        onClick={createModalCtl.open}><Text
                    size='19'>Create</Text></Button>
                <Button leftSection={<IconFileSpreadsheet size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"><Text
                    size='19'>Import from Excel</Text></Button>
                <Button leftSection={<IconFileExport size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"><Text
                    size='19'>Export</Text></Button>
            </Group>
            <CreateModal close={createModalCtl.close} opened={createModalOpened}/>
        </>);
}