import {ActionIcon, Group, Space, TextInput} from "@mantine/core";
import {useState} from "react";
import {DateInput} from "@mantine/dates";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IconAbc, IconCalendar, IconRefresh, IconSearch} from "@tabler/icons-react";
import {useAppDispatch} from "../store";
import pageSlice from "../store/page-slice.ts";

dayjs.extend(customParseFormat);

export default function SearchArea() {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [startDate, setstartDate] = useState<Date | null>(null);
    const [endDate, setendDate] = useState<Date | null>(null);

    function handleClickSearch() {
        const newStartDate = startDate ? new Date(startDate) : null;
        const newEndDate = endDate ? new Date(endDate) : null;
        if (newStartDate)
            newStartDate.setDate(newStartDate.getDate() + 1);
        if (newEndDate)
            newEndDate.setDate(newEndDate.getDate() + 1);
        dispatch(pageSlice.actions.changeCondition({
            startDate: newStartDate ? newStartDate.toISOString().split('T')[0] : null,
            endDate: newEndDate ? newEndDate.toISOString().split('T')[0] : null,
            search
        }))
    }

    function handleClickReset() {
        setSearch('');
        setstartDate(null);
        setendDate(null);
        dispatch(pageSlice.actions.changeCondition({
            startDate: null,
            endDate: null,
            search: ''
        }))
    }

    return (
        <>
            <Group>
                <Group justify='flex-end'>
                    <Group>
                        <IconAbc/>
                        <TextInput size='xs'
                                   placeholder="Text" radius='xl' value={search}
                                   onChange={(event) => setSearch(event.currentTarget.value)}/>
                    </Group>
                    <Space w={50}/>
                    <Group>
                        <IconCalendar/>
                        <DateInput w={130} radius='xl' size='xs'
                                   clearable
                                   valueFormat="DD/MM/YYYY"
                                   value={startDate}
                                   onChange={setstartDate}
                                   placeholder="DD/MM/YYYY"
                                   maxDate={new Date()}/>
                        <DateInput w={130} radius='xl' size='xs'
                                   clearable
                                   valueFormat="DD/MM/YYYY"
                                   value={endDate}
                                   onChange={setendDate}
                                   placeholder="DD/MM/YYYY"
                                   minDate={startDate}
                                   maxDate={new Date()}/>
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