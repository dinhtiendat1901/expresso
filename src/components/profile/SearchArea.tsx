import {ActionIcon, Container, Flex, Group, Space, TextInput} from "@mantine/core";
import {useRef, useState} from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IconRefresh, IconSearch} from "@tabler/icons-react";
import {useAppDispatch} from "../../store";
import pageSlice from "../../store/page-slice.ts";
import {handleKeyPress} from "../../utils/utils.ts";
import ProfileGroupComboBox from "./ProfileGroupComboBox.tsx";
import ScriptComboBox from "./ScriptComboBox.tsx";

dayjs.extend(customParseFormat);

export default function SearchArea() {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [selectedProfileGroup, setSelectedProfileGroup] = useState(undefined);
    const [selectedScriptPath, setSelectedScriptPath] = useState(undefined);
    const profileGroupComboBox = useRef();
    const scriptComboBox = useRef();

    function handleClickSearch() {
        dispatch(pageSlice.actions.changeCondition({
            search,
            profileGroupId: selectedProfileGroup
        }))
    }

    function handleClickReset() {
        setSearch(undefined);
        setSelectedProfileGroup(undefined);
        // @ts-ignore
        profileGroupComboBox.current.clear();
        // @ts-ignore
        scriptComboBox.current.clear();
        dispatch(pageSlice.actions.changeCondition({
            search: '',
            profileGroupId: undefined
        }))
    }

    return (
        <>
            <Flex align='flex-end'>
                <Group>
                    <TextInput fw={700} label='Name' w={301}
                               placeholder="Name" value={search}
                               onChange={(event) => setSearch(event.currentTarget.value)}
                               onKeyPress={handleKeyPress}/>
                    <Container w={301} p={0}>
                        <ProfileGroupComboBox ref={profileGroupComboBox} setProfileGroup={setSelectedProfileGroup}
                                              canClear={true}/>
                    </Container>
                    <Container w={301} p={0}>
                        <ScriptComboBox ref={scriptComboBox} setScriptPath={setSelectedScriptPath} canClear={true}/>
                    </Container>
                </Group>
                <Space w={17}/>
                <Group justify='flex-end'>
                    <ActionIcon variant="light" size={37} radius='xl' onClick={handleClickSearch}>
                        <IconSearch style={{width: '60%', height: '60%'}} stroke={3}/>
                    </ActionIcon>
                    <ActionIcon variant="light" size={37} radius='xl' onClick={handleClickReset}>
                        <IconRefresh style={{width: '60%', height: '60%'}} stroke={3}/>
                    </ActionIcon>
                </Group>
            </Flex>
        </>

    )
}