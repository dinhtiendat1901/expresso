import {ActionIcon, Group, Space, Stack, TextInput} from "@mantine/core";
import {useState} from "react";
import {DateInput} from "@mantine/dates";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IconAbc, IconCalendar, IconRefresh, IconSearch} from "@tabler/icons-react";

dayjs.extend(customParseFormat);

export default function Header() {
    const [startDate, setstartDate] = useState<Date | null>(null);
    const [endDate, setendDate] = useState<Date | null>(null);
    return (

        <>
            <Stack>
                <Group justify='flex-end'>
                    <Group>
                        <IconAbc/>
                        <TextInput size='xs'
                                   placeholder="Text" radius='xl'
                        />
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
                    <ActionIcon variant="light" size={37} radius='xl'>
                        <IconSearch style={{width: '60%', height: '60%'}} stroke={3}/>
                    </ActionIcon>
                    <ActionIcon variant="light" size={37} radius='xl'>
                        <IconRefresh style={{width: '60%', height: '60%'}} stroke={3}/>
                    </ActionIcon>
                </Group>
            </Stack>
        </>

    )
}