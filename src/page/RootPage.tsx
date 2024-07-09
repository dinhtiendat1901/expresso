import {AppShell} from "@mantine/core";
import NavbarSimple from "../components/NavbarSimple.tsx";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {invoke} from "@tauri-apps/api";
import {useAppDispatch} from "../store";
import ConfigSlice from "../store/config-slice.ts";

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