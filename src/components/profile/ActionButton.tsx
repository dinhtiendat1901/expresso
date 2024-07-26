import {Button, Group, Text} from "@mantine/core";
import {IconCirclePlus, IconFileImport} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateModal from "./CreateModal.tsx";
import ImportExcelModal from "./ImportExcelModal.tsx";

export default function ActionButton() {
    const [createModalOpened, createModalCtl] = useDisclosure(false);
    const [excelModalOpened, excelModalCtl] = useDisclosure(false);
    return (
        <>
            <Group>
                <Button leftSection={<IconCirclePlus size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"
                        onClick={createModalCtl.open}><Text
                    size='19' fw={700}>Create</Text></Button>
                <Button leftSection={<IconFileImport size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"
                        onClick={excelModalCtl.open}><Text
                    size='19' fw={700}>Import Excel</Text></Button>
            </Group>
            <CreateModal close={createModalCtl.close} opened={createModalOpened}/>
            <ImportExcelModal close={excelModalCtl.close} opened={excelModalOpened}/>
        </>);
}