import {AppShell, Stack} from "@mantine/core";
import DataTable from "../components/DataTable.tsx";
import ItemPerPage from "../components/ItemPerPage.tsx";
import PaginationPage from "../components/PaginationPage.tsx";
import {useState} from "react";

export interface PageState {
    currentPage: number;
    pageLimit: number;
}

export default function HomePage() {
    const [pageState, setPageState] = useState<PageState>({
        currentPage: 1,
        pageLimit: 10
    });

    function handleCurrentPageChange(page: number) {
        setPageState(prevState => ({
            ...prevState,
            currentPage: page
        }))
    }

    function handlePageLimitChange(limit: number) {
        setPageState({
            currentPage: 1,
            pageLimit: limit
        })
    }


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
                <ItemPerPage handlePageLimitChange={handlePageLimitChange}/>
                <DataTable pageState={pageState}/>
                <PaginationPage pageState={pageState} handlePageChange={handleCurrentPageChange}/>
            </Stack>
        </AppShell.Main>
    </AppShell>
}