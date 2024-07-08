import {Divider, Group, Stack} from "@mantine/core";
import DataTable from "../components/DataTable.tsx";
import PaginationPage from "../components/PaginationPage.tsx";
import ItemPerPage from "../components/ItemPerPage.tsx";
import SearchArea from "../components/SearchArea.tsx";
import ActionButton from "../components/ActionButton.tsx";


export default function HomePage() {

    return <Stack gap='sm'>
        <Group justify='space-between'>
            <SearchArea/>
            <ActionButton/>
        </Group>
        <Divider color='dark' variant='dashed'/>
        <Stack mt={70}>
            <ItemPerPage/>
            <DataTable/>
            <PaginationPage/>
        </Stack>
    </Stack>
}