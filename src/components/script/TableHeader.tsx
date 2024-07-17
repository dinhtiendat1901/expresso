import {Table} from "@mantine/core";
import React from "react";
import classes from '../../css/TableScrollArea.module.css';
import cx from 'clsx';

export default function TableHeader({scrolled}) {
    return (
        <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
            <Table.Tr>
                <Table.Th w={50}>ID</Table.Th>
                <Table.Th w={'20%'}>Name</Table.Th>
                <Table.Th>Path</Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}