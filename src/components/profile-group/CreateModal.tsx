import {Button, Group, Modal, Stack, Text, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch} from "../../store";
import {handleKeyPress, showNotification} from "../../utils/utils.ts";
import {invoke} from "@tauri-apps/api";
import profileGroupSlice from "../../store/profile-group-slice.ts";

interface FormValue {
    name: string
}

const initialValues: FormValue = {
    name: ''
}

interface CreateModalProp {
    close: () => void;
    opened: boolean;
}


export default function CreateModal({close, opened}: CreateModalProp) {
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {
            name: isNotEmpty('Enter your name')
        }
    });

    async function handleCreate(values: FormValue) {
        await invoke('create_profile_group', {
            name: values.name
        });
        form.reset();
        close();
        dispatch(profileGroupSlice.actions.changeTotal(1))
        showNotification('Created')
    }

    function onCloseForm() {
        form.reset();
        close();
    }

    return (

        <Modal opened={opened} onClose={onCloseForm} size='lg'>
            <form onSubmit={form.onSubmit(handleCreate)}>
                <Stack>
                    <TextInput fw={700}
                               withAsterisk
                               label="Name"
                               placeholder="Your name"
                               key={form.key('name')}
                               {...form.getInputProps('name')}
                               onKeyPress={handleKeyPress}/>
                </Stack>

                <Group justify="flex-end" mt="md">
                    <Button type="submit"><Text fw={700}>Create</Text></Button>
                </Group>
            </form>
        </Modal>
    );
}