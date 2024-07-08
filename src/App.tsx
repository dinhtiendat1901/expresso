import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootPage from "./page/RootPage.tsx";
import HomePage from "./page/HomePage.tsx";
import SettingPage from "./page/SettingPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'settings',
                element: <SettingPage/>
            }
        ]
    }
])

export default function App() {
    return <MantineProvider>
        <Notifications/>
        <RouterProvider router={router}/>
    </MantineProvider>
}