import {Table, Text} from "@mantine/core";
import React from "react";
import classes from '../../css/TableScrollArea.module.css';
import cx from 'clsx';

export default function TableHeader({scrolled}) {
    return (
        <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
            <Table.Tr>
                <Table.Th w={50}><Text fw={900}>ID</Text></Table.Th>
                <Table.Th w={'20%'}><Text fw={900}>Name</Text></Table.Th>
                <Table.Th><Text fw={900}>Path</Text></Table.Th>
                <Table.Th w={250}><Text fw={900}>Action</Text></Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}