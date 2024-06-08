import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {AppShell, MantineProvider} from '@mantine/core';
import HomePage from "./page/HomePage.tsx";
import Navbar from "./page/Navbar.tsx";
import {Notifications} from "@mantine/notifications";
import Header from "./page/Header.tsx";

export default function App() {
    return <MantineProvider>
        <Notifications/>
        <AppShell header={{height: 150}} navbar={{
            width: 300,
            breakpoint: 'sm'
        }} padding="md">
            <AppShell.Header p="md">
                <Header/>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Navbar/>
            </AppShell.Navbar>
            <AppShell.Main>
                <HomePage/>
            </AppShell.Main>
        </AppShell>
    </MantineProvider>
}