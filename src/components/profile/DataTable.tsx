import React, {useState} from 'react';
import {ScrollArea, Table} from '@mantine/core';
import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";


export default function DataTable() {
    const [scrolled, setScrolled] = useState(false);

    return (
        <ScrollArea h={1070} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
            <Table striped>
                <TableHeader scrolled={scrolled}/>
                <TableBody/>
            </Table>
        </ScrollArea>
    );
}