import {Select, Stack, Text} from '@mantine/core';
import React from "react";

interface ItemPerPageProps {
    handlePageLimitChange: (limit: number) => void
}

export default function ItemPerPage({handlePageLimitChange}: ItemPerPageProps) {
    return (
        <>
            <Stack gap='xs'>
                <Text fw={700}>Items per page:</Text>
                <Select w={70}
                        placeholder="Pick value"
                        data={['10', '20', '30', '40']}
                        defaultValue="10"
                        allowDeselect={false}
                        onChange={(value) => handlePageLimitChange(parseInt(value))}/>
            </Stack>

        </>
    );
}