import {AppShell} from "@mantine/core";
import NavbarSimple from "../components/NavbarSimple.tsx";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {invoke} from "@tauri-apps/api";
import {useAppDispatch} from "../store";
import ConfigSlice from "../store/config-slice.ts";
import {io} from "socket.io-client";
import profileSlice from "../store/profile-slice.ts";

interface Config {
    id: number,
    path: string
}

export default function RootPage() {
    const dispatch = useAppDispatch()

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
        })
    }, []);

    return <AppShell navbar={{
        width: 350,
        breakpoint: 'sm'
    }} padding="md">
        <AppShell.Navbar p="md">
            <NavbarSimple/>
        </AppShell.Navbar>
        <AppShell.Main>
            <Outlet/>
        </AppShell.Main>
    </AppShell>
}