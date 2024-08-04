import {Button, Group, Text} from "@mantine/core";
import {IconFileImport, IconPencilPlus, IconSettingsAutomation} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateModal from "./modal/CreateModal.tsx";
import BatchImportModal from "./modal/BatchImportModal.tsx";
import RunModal from "./modal/RunModal.tsx";
import {useAppSelector} from "../../store";

export default function ActionButton() {
    const [createModalOpened, createModalCtl] = useDisclosure(false);
    const [batchModalOpened, batchModalCtl] = useDisclosure(false);
    const [runModalOpened, runModalCtl] = useDisclosure(false);
    const listProfiles = useAppSelector(state => state.profile.listProfiles);
    const selectedProfile = listProfiles.some((value) => value.checked);
    return (
        <>
            <Group>
                <Button leftSection={<IconPencilPlus size={21}/>} variant="light"
                        onClick={createModalCtl.open}><Text
                    size='19' fw={700}>Create</Text></Button>
                <Button leftSection={<IconFileImport size={21}/>} variant="light"
                        onClick={batchModalCtl.open}><Text
                    size='19' fw={700}>Batch Import</Text></Button>
                <Button leftSection={<IconSettingsAutomation size={21}/>} variant="light"
                        onClick={runModalCtl.open} disabled={!selectedProfile}><Text
                    size='19' fw={700}>Run Script</Text></Button>
            </Group>
            <CreateModal close={createModalCtl.close} opened={createModalOpened}/>
            <BatchImportModal close={batchModalCtl.close} opened={batchModalOpened}/>
            <RunModal close={runModalCtl.close} opened={runModalOpened}/>
        </>);
}