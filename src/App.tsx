import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import HomePage from "./page/HomePage.tsx";

export default function App() {
    return <MantineProvider>
        <HomePage/>
    </MantineProvider>
}