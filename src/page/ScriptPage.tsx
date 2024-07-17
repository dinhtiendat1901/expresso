import {Divider, Group, Stack} from "@mantine/core";
import ScriptTable from "../components/script/ScriptTable.tsx";

export default function ScriptPage() {
    return <Stack gap='sm'>
        <Group justify='space-between'>

        </Group>
        <Divider color='dark' variant='dashed'/>
        <Stack mt={70}>
            <ScriptTable/>
        </Stack>
    </Stack>
}