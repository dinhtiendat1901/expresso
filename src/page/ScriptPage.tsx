import {Group, Stack} from "@mantine/core";
import ScriptTable from "../components/script/ScriptTable.tsx";
import ActionButton from "../components/script/ActionButton.tsx";

export default function ScriptPage() {
    return <Stack gap='sm'>
        <Stack mt={70}>
            <Group justify='flex-end'>
                <ActionButton/>
            </Group>
            <ScriptTable/>
        </Stack>
    </Stack>
}