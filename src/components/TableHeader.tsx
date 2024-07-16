import {Checkbox, Table} from "@mantine/core";
import React from "react";
import {useAppDispatch, useAppSelector} from "../store";
import classes from '../css/TableScrollArea.module.css';
import cx from 'clsx';
import dataSlice from "../store/data-slice.ts";

export default function TableHeader({scrolled}) {
    const dispatch = useAppDispatch()
    const listProfiles = useAppSelector(state => state.data.listProfiles);
    const allChecked = listProfiles.every((value) => value.checked);
    const indeterminate = listProfiles.some((value) => value.checked) && !allChecked;
    return (
        <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
            <Table.Tr>
                <Table.Th w={50}>
                    <Checkbox
                        checked={allChecked}
                        indeterminate={indeterminate}
                        onChange={() =>
                            dispatch(dataSlice.actions.selectAll())
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