import {Button, Text} from "@mantine/core";
import {IconCirclePlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateModal from "./CreateModal";

export default function ActionButton() {
    const [createModalOpened, createModalCtl] = useDisclosure(false);
    return (
        <>
            <Button leftSection={<IconCirclePlus size={21}/>} variant="light" color="rgba(0, 3, 166, 1)"
                    onClick={createModalCtl.open}><Text
                size='19'>Create</Text></Button>
            <CreateModal close={createModalCtl.close} opened={createModalOpened}/>
        </>);
}