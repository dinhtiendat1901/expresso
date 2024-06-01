import {Stack} from "@mantine/core";
import DataTable from "../components/DataTable.tsx";
import PaginationPage from "../components/PaginationPage.tsx";
import ItemPerPage from "../components/ItemPerPage.tsx";


export default function HomePage() {

    return <Stack gap='xl'>
        <ItemPerPage/>
        <DataTable/>
        <PaginationPage/>
    </Stack>
}