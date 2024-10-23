import {AppShell, Box, LoadingOverlay} from "@mantine/core";
import NavbarSimple from "../components/NavbarSimple.tsx";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {invoke} from "@tauri-apps/api/core";
import {useAppDispatch, useAppSelector} from "../store";
import ConfigSlice from "../store/config-slice.ts";
import {io} from "socket.io-client";
import profileSlice from "../store/profile-slice.ts";
import scriptSlice, {Script} from "../store/script-slice.ts";
import pageSlice from "../store/page-slice.ts";
import profileGroupSlice, {ProfileGroup} from "../store/profile-group-slice.ts";

interface Config {
    id: number,
    path: string
}

export default function RootPage() {
    const dispatch = useAppDispatch()
    const totalScript = useAppSelector(state => state.script.total);
    const totalProfileGroup = useAppSelector(state => state.profileGroup.total);
    const scriptRunning = useAppSelector(state => state.page.scriptRunning);

    useEffect(() => {
        async function fetchConfig() {
            const config: Config = await invoke('get_config');
            dispatch(ConfigSlice.actions.changePath(config.path))
        }

        fetchConfig().then();
    }, []);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_PUPPETEER_SERVER_URL);
        socket.on('close-profile', (profileId) => {
            dispatch(profileSlice.actions.setRunning({
                id: profileId,
                running: false
            }));
        });
        socket.on('finish-script', async (listRunStatus) => {
            await invoke('batch_import_run_status', {
                runStatusList: listRunStatus
            });
            dispatch(pageSlice.actions.changeScriptRunning())
        });

    }, []);

    useEffect(() => {
        async function fetchData() {
            const listScripts: Script[] = await invoke('read_scripts', {
                skip: 0,
                limit: 100
            });
            const totalScript: number = await invoke('read_total_scripts')
            dispatch(scriptSlice.actions.setListScripts(listScripts))
            dispatch(scriptSlice.actions.setTotal(totalScript))
        }

        fetchData().then()
    }, [totalScript]);

    useEffect(() => {
        async function fetchData() {
            const listProfileGroup: ProfileGroup[] = await invoke('list_profile_groups');
            const totalProfileGroup: number = await invoke('read_total_profile_groups')
            dispatch(profileGroupSlice.actions.setListProfileGroups(listProfileGroup))
            dispatch(profileGroupSlice.actions.setTotal(totalProfileGroup))
        }

        fetchData().then()
    }, [totalProfileGroup]);


    return <AppShell navbar={{
        width: 350,
        breakpoint: 'sm'
    }} padding="md">
        <Box>
            <LoadingOverlay visible={scriptRunning} zIndex={1000} overlayProps={{radius: "sm", blur: 0}}/>
            <AppShell.Navbar p="md">
                <NavbarSimple/>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </Box>
    </AppShell>
}