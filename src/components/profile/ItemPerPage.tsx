import {Select} from '@mantine/core';
import React from "react";
import {useAppDispatch} from "../../store";
import pageSlice from "../../store/page-slice.ts";


export default function ItemPerPage() {
    const dispatch = useAppDispatch()

    function handlePageLimitChange(limit: number) {
        dispatch(pageSlice.actions.changePageLimit(limit));
    }

    return (
        <>
            <Select w={70} fw={700}
                    placeholder="Pick value"
                    data={['10', '20', '30', '40']}
                    defaultValue="10"
                    allowDeselect={false}
                    withCheckIcon={false}
                    onChange={(value) => handlePageLimitChange(parseInt(value))}/>
        </>
    );
}