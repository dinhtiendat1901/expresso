import React, {useState} from 'react';
import {ScrollArea, Table} from '@mantine/core';
import TableHeader from './TableHeader';
import TableBody from './TableBody';


export default function ScriptTable() {
    const [scrolled, setScrolled] = useState(false);

    return (
        <ScrollArea h={700} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
            <Table striped>
                <TableHeader scrolled={scrolled}/>
                <TableBody/>
            </Table>
        </ScrollArea>
    );
}