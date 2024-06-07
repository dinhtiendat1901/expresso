import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {AppShell, MantineProvider} from '@mantine/core';
import HomePage from "./page/HomePage.tsx";
import Navbar from "./page/Navbar.tsx";
import {Notifications} from "@mantine/notifications";

export default function App() {
    return <MantineProvider>
        <Notifications/>
        <AppShell header={{height: 60}} navbar={{
            width: 300,
            breakpoint: 'sm'
        }} padding="md">
            <AppShell.Header p="md">
                <div>Logo</div>
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