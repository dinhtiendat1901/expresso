import '@mantine/core/styles.css';
import {AppShell, MantineProvider} from '@mantine/core';

export default function App() {
    return <MantineProvider>
        <AppShell header={{height: 60}} navbar={{
            width: 300,
            breakpoint: 'sm'
        }} padding="md">
            <AppShell.Header p="md">
                <div>Logo</div>
            </AppShell.Header>
            <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
            <AppShell.Main>Main</AppShell.Main>
        </AppShell>
    </MantineProvider>
}