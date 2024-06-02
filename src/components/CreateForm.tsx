import {Button, Group, Stack, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import axios from "axios";
import {useAppDispatch} from "../store";
import dialogSlice from "../store/dialog-slice.ts";
import {randomId} from "@mantine/hooks";

interface FormValue {
    name: string,
    description: string
}

const initialValues: FormValue = {
    name: '',
    description: ''
}


export default function CreateForm({close}) {
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
        await axios.post('http://127.0.0.1:8000/profiles', {
            name: values.name,
            description: values.description
        });
        close();

        dispatch(dialogSlice.actions.pushMessage({
            id: randomId(),
            message: 'Created',
            status: "Success"
        }))


    }

    return (
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
    );
}