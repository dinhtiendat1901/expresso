import {Button, Group, Modal} from "@mantine/core";

interface DeleteModalProp {
    close: () => void;
    opened: boolean;
}

export default function DeleteModal({close, opened}: DeleteModalProp) {

    return (
        <Modal opened={opened} onClose={close} withCloseButton={false} closeOnEscape={false}
               closeOnClickOutside={false}>
            <Group justify='center'>
                <Button>Ok</Button>
                <Button onClick={close}>Cancel</Button>
            </Group>
        </Modal>
    )
}