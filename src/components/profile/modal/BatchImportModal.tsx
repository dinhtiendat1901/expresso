import {Button, Group, Modal, NumberInput, Stack, Text} from '@mantine/core';
import {isNotEmpty, useForm} from '@mantine/form';
import {useAppDispatch} from "../../../store";
import {useState} from "react";
import ProfileGroupComboBox from "../search-area/ProfileGroupComboBox.tsx";
import {invoke} from "@tauri-apps/api";
import pageSlice from "../../../store/page-slice.ts";
import {showNotification} from "../../../utils/utils.ts";
import classes from '../../../css/Modal.module.css';

interface FormValue {
    count: number
}

const initialValues: FormValue = {
    count: 1
}

interface CreateModalProp {
    close: () => void;
    opened: boolean;
}


export default function BatchImportModal({close, opened}: CreateModalProp) {
    const dispatch = useAppDispatch()
    const [selectedProfileGroup, setSelectedProfileGroup] = useState('')
    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: {
            count: isNotEmpty('Select your count')
        },
    });

    async function handleCreate(values: FormValue) {
        await invoke('batch_import_profile', {
            count: values.count,
            groupId: selectedProfileGroup
        });
        form.reset();
        close();
        dispatch(pageSlice.actions.changeTotal(values.count))
        showNotification('Batch import successfully')

    }

    function onCloseForm() {
        form.reset();
        close();
    }


    return (
        <Modal opened={opened} onClose={onCloseForm} closeOnClickOutside={false} title='Batch Import' classNames={{
            title: classes.title
        }}>
            <form onSubmit={form.onSubmit(handleCreate)}>
                <Stack>
                    <NumberInput fw={700}
                                 allowNegative={false}
                                 max={1000}
                                 min={1}
                                 step={100}
                                 withAsterisk
                                 label="Number of Profile"
                                 key={form.key('count')}
                                 {...form.getInputProps('count')}/>
                    <ProfileGroupComboBox setProfileGroup={setSelectedProfileGroup} canClear={false}/>
                </Stack>

                <Group justify="flex-end" mt="md">
                    <Button type="submit"><Text fw={700}>Create</Text></Button>
                </Group>
            </form>
        </Modal>
    );
}