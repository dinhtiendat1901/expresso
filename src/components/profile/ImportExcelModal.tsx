import {Button, Group, Modal, Stack, Text, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch} from "../../store";
import {open} from "@tauri-apps/api/dialog";

interface FormValue {
    path: string
}

const initialValues: FormValue = {
    path: ''
}

interface CreateModalProp {
    close: () => void;
    opened: boolean;
}


export default function ImportExcelModal({close, opened}: CreateModalProp) {
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {
            path: isNotEmpty('Select your path')
        },
    });

    async function handleCreate(values: FormValue) {

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