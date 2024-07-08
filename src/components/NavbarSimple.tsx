import {useState} from 'react';
import {Code, Group} from '@mantine/core';
import {IconHome2, IconLogout, IconSettings, IconSwitchHorizontal,} from '@tabler/icons-react';

import classes from '../css/NavbarSimple.module.css';
import {Link} from "react-router-dom";

const data = [
    {link: '/', label: 'Home', icon: IconHome2},
    {link: '/settings', label: 'Settings', icon: IconSettings},
];

export default function NavbarSimple() {
    const [active, setActive] = useState('Home');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            to={item.link}
            key={item.label}
            onClick={() => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5}/>
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <Code fw={700}>v3.1.2</Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5}/>
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5}/>
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}