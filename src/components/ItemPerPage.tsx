import {Select, Stack, Text} from '@mantine/core';

export default function ItemPerPage() {
    return (
        <>
            <Stack gap='xs'>
                <Text fw={700}>Items per page:</Text>
                <Select w={70}
                        placeholder="Pick value"
                        data={['10', '20', '30', '40']}
                        defaultValue="10"
                        allowDeselect={false}
                />
            </Stack>

        </>
    );
}