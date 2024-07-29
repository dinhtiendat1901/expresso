import {Checkbox, Table, Text} from "@mantine/core";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import classes from '../../css/TableScrollArea.module.css';
import cx from 'clsx';
import profileSlice from "../../store/profile-slice.ts";

export default function TableHeader({scrolled}) {
    const dispatch = useAppDispatch()
    const listProfiles = useAppSelector(state => state.profile.listProfiles);
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
                            dispatch(profileSlice.actions.selectAll())
                        }
                    />
                </Table.Th>
                <Table.Th w={'20%'}><Text fw={900}>Name</Text></Table.Th>
                <Table.Th w={250}><Text fw={900}>Action</Text></Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}