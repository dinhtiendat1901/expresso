import {Button, Group, Modal, Stack, Text, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch} from "../../store";
import {showNotification} from "../../utils/utils.ts";
import {invoke} from "@tauri-apps/api";
import {open} from "@tauri-apps/api/dialog";
import scriptSlice from "../../store/script-slice.ts";
import classes from '../../css/Label.module.css';

interface FormValue {
    name: string,
    path: string
}

const initialValues: FormValue = {
    name: '',
    path: ''
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
            name: isNotEmpty('Enter your name'),
            path: isNotEmpty('Select your path')
        },
    });

    async function handleCreate(values: FormValue) {
        await invoke('create_script', {
            name: values.name,
            path: values.path
        });
        form.reset();
        close();
        dispatch(scriptSlice.actions.changeTotal(1))
        showNotification('Created')
    }

    function onCloseForm() {
        form.reset();
        close();
    }

    async function handleSelectPath() {
        const selectPath = await open({
            directory: false,
            filters: [{
                name: 'Image',
                extensions: ['js']
            }]
        });
        if (selectPath) {
            form.setFieldValue('path', (selectPath as string).replace(/\\/g, '/'))
        }
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
                               classNames={{label: classes.label}}/>

                    <TextInput fw={700} classNames={{label: classes.label}}
                               withAsterisk
                               label="Path"
                               key={form.key('path')}
                               {...form.getInputProps('path')} onClick={handleSelectPath} pointer/>
                </Stack>

                <Group justify="flex-end" mt="md">
                    <Button type="submit"><Text fw={700}>Create</Text></Button>
                </Group>
            </form>
        </Modal>
    );
}