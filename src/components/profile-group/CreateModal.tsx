import {Button, ColorPicker, Group, Modal, Space, Stack, Text, TextInput} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch} from "../../store";
import {handleKeyPress, showNotification} from "../../utils/utils.ts";
import {invoke} from "@tauri-apps/api/core";
import profileGroupSlice from "../../store/profile-group-slice.ts";
import {useState} from "react";
import classes from '../../css/Modal.module.css';

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
    const [color, setColor] = useState('#189625ff')
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {
            name: isNotEmpty('Enter your name')
        }
    });

    async function handleCreate(values: FormValue) {
        await invoke('create_profile_group', {
            name: values.name,
            color
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

        <Modal opened={opened} onClose={onCloseForm} size='lg' title='Create Group' closeOnClickOutside={false}
               classNames={{
                   title: classes.title
               }}>
            <form onSubmit={form.onSubmit(handleCreate)}>
                <Stack gap='sm'>
                    <TextInput fw={700}
                               withAsterisk
                               label="Name"
                               placeholder="Your name"
                               key={form.key('name')}
                               {...form.getInputProps('name')}
                               onKeyPress={handleKeyPress}/>
                    <Space h='md'/>
                    <Text fw={900}>Pick color</Text>
                    <ColorPicker format="hexa" value={color} onChange={setColor}
                                 swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                                 swatchesPerRow={9}/>
                </Stack>

                <Group justify="flex-end" mt="md">
                    <Button type="submit"><Text fw={700}>Create</Text></Button>
                </Group>
            </form>
        </Modal>
    );
}