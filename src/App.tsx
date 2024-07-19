import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootPage from "./page/RootPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";
import SettingPage from "./page/SettingPage.tsx";
import ScriptPage from "./page/ScriptPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage/>,
        children: [
            {
                index: true,
                element: <ProfilePage/>
            },
            {
                path: 'settings',
                element: <SettingPage/>
            },
            {
                path: 'scripts',
                element: <ScriptPage/>
            }
        ]
    }
])

const theme = createTheme({
    fontSmoothing: true,
    fontFamily: 'Nunito, sans-serif',
    primaryColor: 'pink'
});

export default function App() {
    return <MantineProvider theme={theme}>
        <Notifications/>
        <RouterProvider router={router}/>
    </MantineProvider>
}