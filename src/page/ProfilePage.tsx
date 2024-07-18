import {Divider, Group, Stack} from "@mantine/core";
import DataTable from "../components/profile/DataTable.tsx";
import PaginationPage from "../components/profile/PaginationPage.tsx";
import ItemPerPage from "../components/profile/ItemPerPage.tsx";
import SearchArea from "../components/profile/SearchArea.tsx";
import ActionButton from "../components/profile/ActionButton.tsx";
import RunScript from "../components/profile/RunScript.tsx";


export default function ProfilePage() {

    return <Stack gap='sm'>
        <Group justify='space-between'>
            <SearchArea/>
            <RunScript/>
        </Group>
        <Divider color='dark' variant='dashed'/>
        <Stack mt={70}>
            <Group justify='space-between'>
                <ItemPerPage/>
                <ActionButton/>
            </Group>
            <DataTable/>
            <PaginationPage/>
        </Stack>
    </Stack>
}