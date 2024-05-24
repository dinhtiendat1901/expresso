import {useState} from 'react';
import {Table, Checkbox, Button, Group} from '@mantine/core';

const elements = [
    {position: 6, mass: 12.011, symbol: 'C', name: 'Carbon'},
    {position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen'},
    {position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium'},
    {position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium'},
    {position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium'},
];

export default function DataTable() {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const rows = elements.map((element) => (
        <Table.Tr
            key={element.name}
            bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
        >
            <Table.Td>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRows.includes(element.position)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, element.position]
                                : selectedRows.filter((position) => position !== element.position)
                        )
                    }
                />
            </Table.Td>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
            <Table.Td>
                <Group>
                    <Button radius='xl' variant="gradient"
                            gradient={{from: 'indigo', to: 'cyan', deg: 145}}>Run</Button>
                    <Button color='red' radius='xl' variant="gradient"
                            gradient={{from: 'grape', to: 'red', deg: 360}}>Delete</Button>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>
                        <Checkbox
                            aria-label="Select row"
                        />
                    </Table.Th>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Created Date</Table.Th>
                    <Table.Th>Action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}