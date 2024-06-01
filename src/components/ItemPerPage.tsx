import {Select, Stack, Text} from '@mantine/core';
import React from "react";
import {useAppDispatch} from "../store";
import pageSlice from "../store/page-slice.ts";


export default function ItemPerPage() {
    const dispatch = useAppDispatch()

    function handlePageLimitChange(limit: number) {
        dispatch(pageSlice.actions.changePageLimit(limit));
    }

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