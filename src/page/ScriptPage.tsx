import {Divider, Group, Stack} from "@mantine/core";
import ScriptTable from "../components/script/ScriptTable.tsx";
import ActionButton from "../components/script/ActionButton.tsx";

export default function ScriptPage() {
    return <Stack gap='sm'>
        <Group justify='flex-end'>
            <ActionButton/>
        </Group>
        <Divider color='dark' variant='dashed'/>
        <Stack mt={70}>
            <ScriptTable/>
        </Stack>
    </Stack>
}