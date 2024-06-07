import {Checkbox, Table} from "@mantine/core";
import checkboxSlice from "../store/checkbox-slice.ts";
import React from "react";
import {useAppDispatch, useAppSelector} from "../store";
import classes from '../css/TableScrollArea.module.css';
import cx from 'clsx';

export default function TableHeader({scrolled}) {
    const dispatch = useAppDispatch()
    const checkboxState = useAppSelector(state => state.checkbox.listCheckbox);
    const allChecked = checkboxState.every((value) => value.checked);
    const indeterminate = checkboxState.some((value) => value.checked) && !allChecked;
    return (
        <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
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