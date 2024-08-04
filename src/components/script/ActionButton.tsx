import {Button, Text} from "@mantine/core";
import {IconPencilPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateModal from "./CreateModal";

export default function ActionButton() {
    const [createModalOpened, createModalCtl] = useDisclosure(false);
    return (
        <>
            <Button leftSection={<IconPencilPlus size={21}/>} variant="light"
                    onClick={createModalCtl.open}><Text
                size='19' fw={700}>Create</Text></Button>
            <CreateModal close={createModalCtl.close} opened={createModalOpened}/>
        </>);
}