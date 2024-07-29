import {ActionIcon, Group, TextInput} from "@mantine/core";
import {useState} from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IconAbc, IconRefresh, IconSearch} from "@tabler/icons-react";
import {useAppDispatch} from "../../store";
import pageSlice from "../../store/page-slice.ts";

dayjs.extend(customParseFormat);

export default function SearchArea() {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');

    function handleClickSearch() {
        dispatch(pageSlice.actions.changeCondition({
            search
        }))
    }

    function handleClickReset() {
        setSearch('');
        dispatch(pageSlice.actions.changeCondition({
            search: ''
        }))
    }

    return (
        <>
            <Group>
                <Group justify='flex-end'>
                    <Group>
                        <IconAbc/>
                        <TextInput fw={700}
                                   placeholder="Name" value={search}
                                   onChange={(event) => setSearch(event.currentTarget.value)}/>
                    </Group>
                </Group>
                <Group justify='flex-end'>
                    <ActionIcon variant="light" size={37} radius='xl' onClick={handleClickSearch}>
                        <IconSearch style={{width: '60%', height: '60%'}} stroke={3}/>
                    </ActionIcon>
                    <ActionIcon variant="light" size={37} radius='xl' onClick={handleClickReset}>
                        <IconRefresh style={{width: '60%', height: '60%'}} stroke={3}/>
                    </ActionIcon>
                </Group>
            </Group>
        </>

    )
}