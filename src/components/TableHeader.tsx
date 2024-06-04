import {Checkbox, Table} from "@mantine/core";
import checkboxSlice from "../store/checkbox-slice.ts";
import React from "react";
import {useAppDispatch, useAppSelector} from "../store";

export default function TableHeader() {
    const dispatch = useAppDispatch()
    const checkboxState = useAppSelector(state => state.checkbox.listCheckbox);
    const allChecked = checkboxState.every((value) => value.checked);
    const indeterminate = checkboxState.some((value) => value.checked) && !allChecked;
    return (
        <Table.Thead>
            <Table.Tr>
                <Table.Th w={50}>
                    <Checkbox
                        checked={allChecked}
                        indeterminate={indeterminate}
                        onChange={() =>
                            dispatch(checkboxSlice.actions.selectAll())
                        }
                    />
                </Table.Th>
                <Table.Th w={50}>ID</Table.Th>
                <Table.Th w={'20%'}>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th w={300}>Created Date</Table.Th>
                <Table.Th w={250}>Action</Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}