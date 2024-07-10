import {Button, Group, Modal, Stack, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch, useAppSelector} from "../store";
import pageSlice from "../store/page-slice.ts";
import {showNotification} from "../utils/utils.ts";
import {invoke} from "@tauri-apps/api";
import {fetch, ResponseType} from '@tauri-apps/api/http';

interface FormValue {
    name: string,
    description: string
}

const initialValues: FormValue = {
    name: '',
    description: ''
}

interface CreateModalProp {
    close: () => void;
    opened: boolean;
}


export default function CreateModal({close, opened}: CreateModalProp) {
    const path = useAppSelector(state => state.config.path)
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {
            name: isNotEmpty('Enter your name'),
            description: isNotEmpty('Enter your name')
        },
    });

    async function handleCreate(values: FormValue) {
        const response = await fetch<string>('http://localhost:3000/create-profile', {
            method: 'POST',
            timeout: 30,
            body: {
                type: 'Json',
                payload: {
                    path: path
                }
            },
            responseType: ResponseType.Text
        });
        await invoke('create_profile', {
            name: values.name,
            description: values.description,
            path: response.data
        });
        form.reset();
        close();
        dispatch(pageSlice.actions.changeTotal(1))
        showNotification('Created')
    }

    return (

        <Modal opened={opened} onClose={close}>
            <form onSubmit={form.onSubmit(handleCreate)}>
                <Stack>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="Your name"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        withAsterisk
                        label="Description"
                        placeholder="Description"
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />
                </Stack>

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Create</Button>
                </Group>
            </form>
        </Modal>
    );
}