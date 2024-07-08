import {AppShell} from "@mantine/core";
import NavbarSimple from "../components/NavbarSimple.tsx";
import {Outlet} from "react-router-dom";

export default function RootPage() {
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