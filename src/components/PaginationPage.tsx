import {Group, Pagination} from '@mantine/core';

export default function PaginationPage() {
    return (
        <Pagination.Root total={10}>
            <Group gap={5} justify="center">
                <Pagination.First/>
                <Pagination.Previous/>
                <Pagination.Items/>
                <Pagination.Next/>
                <Pagination.Last/>
            </Group>
        </Pagination.Root>
    );
}