import {AppShell, Stack} from "@mantine/core";
import DataTable from "../components/DataTable.tsx";
import ItemPerPage from "../components/ItemPerPage.tsx";
import PaginationPage from "../components/PaginationPage.tsx";

export default function HomePage() {

    return <AppShell header={{height: 60}} navbar={{
        width: 300,
        breakpoint: 'sm'
    }} padding="md">
        <AppShell.Header p="md">
            <div>Logo</div>
        </AppShell.Header>
        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
        <AppShell.Main>
            <Stack gap='xl'>
                <ItemPerPage/>
                <DataTable/>
                <PaginationPage/>
            </Stack>
        </AppShell.Main>
    </AppShell>
}