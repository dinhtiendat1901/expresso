import {Button, Container, Flex, Group, Text, TextInput} from "@mantine/core";
import React, {useRef, useState} from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IconFileSearch, IconRefresh} from "@tabler/icons-react";
import {useAppDispatch} from "../../../store";
import pageSlice from "../../../store/page-slice.ts";
import {handleKeyPress} from "../../../utils/utils.ts";
import ProfileGroupComboBox from "./ProfileGroupComboBox.tsx";
import ScriptComboBox from "./ScriptComboBox.tsx";
import StatusRadio from "./StatusRadio.tsx";

dayjs.extend(customParseFormat);

export default function SearchArea() {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(undefined);
    const [selectedScriptId, setSelectedScriptId] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const profileGroupComboBox = useRef();
    const scriptComboBox = useRef();
    const statusRadioBox = useRef();

    function handleClickSearch() {
        dispatch(pageSlice.actions.changeCondition({
            search,
            groupId: selectedGroupId,
            scriptId: selectedScriptId,
            status
        }))
    }

    function handleClickReset() {
        setSearch(undefined);
        setSelectedGroupId(undefined);
        setSelectedScriptId(undefined);
        // @ts-ignore
        profileGroupComboBox.current.clear();
        // @ts-ignore
        scriptComboBox.current.clear();
        // @ts-ignore
        statusRadioBox.current.clear();
        dispatch(pageSlice.actions.changeCondition({
            search: '',
            groupId: undefined,
            scriptId: undefined,
            status: undefined
        }))
    }

    return (
        <>
            <Flex align='flex-end' justify='space-between'>
                <Group>
                    <TextInput fw={700} label='Name' w={301}
                               placeholder="Name" value={search}
                               onChange={(event) => setSearch(event.currentTarget.value)}
                               onKeyPress={handleKeyPress}/>
                    <Container w={301} p={0}>
                        <ProfileGroupComboBox ref={profileGroupComboBox} setGroupId={setSelectedGroupId}
                                              canClear={true}/>
                    </Container>
                    <Container w={301} p={0}>
                        <ScriptComboBox ref={scriptComboBox} setScriptId={setSelectedScriptId} canClear={true}/>
                    </Container>
                    <StatusRadio setStatus={setStatus} ref={statusRadioBox} selectedScriptId={selectedScriptId}/>
                </Group>
                <Group justify='flex-end'>
                    <Button size='xs' radius='xl' onClick={handleClickSearch} rightSection={<IconFileSearch size={15}
                    />}><Text fw={700}>Search</Text></Button>
                    <Button size='xs' radius='xl' variant='light' onClick={handleClickReset}
                            rightSection={<IconRefresh size={15}
                            />}><Text fw={700}>Reset</Text></Button>
                </Group>
            </Flex>
        </>

    )
}