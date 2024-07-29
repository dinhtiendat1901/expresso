import {Group, Stack} from "@mantine/core";
import ActionButton from "../components/profile-group/ActionButton.tsx";
import ProfileGroupTable from "../components/profile-group/ProfileGroupTable.tsx";

export default function ProfileGroupPage() {
    return <Stack gap='sm'>
        <Stack mt={70}>
            <Group justify='flex-end'>
                <ActionButton/>
            </Group>
            <ProfileGroupTable/>
        </Stack>
    </Stack>
}