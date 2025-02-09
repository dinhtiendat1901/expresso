import {Button, Group, Modal, Stack, Text, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch} from "../../../store";
import pageSlice from "../../../store/page-slice.ts";
import {handleKeyPress, showNotification} from "../../../utils/utils.ts";
import {invoke} from "@tauri-apps/api/core";
import {useState} from "react";
import ProfileGroupComboBox from "../search-area/ProfileGroupComboBox.tsx";
import classes from '../../../css/Modal.module.css';

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
    const [selectedGroupId, setSelectedGroupId] = useState('')
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {
            name: isNotEmpty('Enter your name')
        },
    });

    async function handleCreate(values: FormValue) {
        await invoke('create_profile', {
            name: values.name,
            groupId: selectedGroupId
        });
        form.reset();
        close();
        dispatch(pageSlice.actions.changeTotal(1))
        showNotification('Created')
    }

    function onCloseForm() {
        form.reset();
        close();
    }

    return (

        <Modal opened={opened} onClose={onCloseForm} closeOnClickOutside={false} title='Create Profile' classNames={{
            title: classes.title
        }}>
            <form onSubmit={form.onSubmit(handleCreate)}>
                <Stack>
                    <TextInput fw={700}
                               withAsterisk
                               label="Name"
                               placeholder="Your name"
                               key={form.key('name')}
                               {...form.getInputProps('name')}
                               onKeyPress={handleKeyPress}/>
                    <ProfileGroupComboBox setGroupId={setSelectedGroupId} canClear={false}/>
                </Stack>

                <Group justify="flex-end" mt="md">
                    <Button type="submit"><Text fw={700}>Create</Text></Button>
                </Group>
            </form>
        </Modal>
    );
}