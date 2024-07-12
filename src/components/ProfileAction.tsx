import {ActionIcon, Group} from "@mantine/core";
import {IconPlayerPause, IconPlayerPlay, IconTrash} from "@tabler/icons-react";
import React, {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import DeleteModal from "./DeleteModal.tsx";
import dataSlice, {Profile} from "../store/data-slice.ts";
import {fetch, ResponseType} from "@tauri-apps/api/http";
import {useAppDispatch} from "../store";

interface ProfileActionProp {
    profile: Profile
}

export default function ProfileAction({profile}: ProfileActionProp) {
    const dispatch = useAppDispatch()
    const [deleteProfileId, setDeleteProfileId] = useState(0);
    const [deleteModalOpened, deleteModalCtl] = useDisclosure(false);

    function handleClickDelete(id: number) {
        setDeleteProfileId(id);
        deleteModalCtl.open()
    }

    async function handleClickRun() {
        await fetch(`${import.meta.env.VITE_PUPPETEER_SERVER_URL}/run-profile`, {
            method: 'GET',
            timeout: 30,
            query: {
                id: profile.id.toString(),
                path: profile.path
            },
            responseType: ResponseType.Text
        });
        dispatch(dataSlice.actions.setRunning({
            id: profile.id,
            running: true
        }));
    }

    const actionIcon = profile.running ? <ActionIcon variant='subtle' pl='5' pr='5' color='black'><IconPlayerPause
        size={21}/></ActionIcon> : <ActionIcon variant='subtle' pl='5' pr='5' onClick={handleClickRun}>
        <IconPlayerPlay size={21}/>
    </ActionIcon>

    return (
        <>
            <Group>
                {actionIcon}
                <ActionIcon variant='subtle' color='red' pl='5' pr='5' onClick={() => {
                    handleClickDelete(profile.id)
                }}><IconTrash
                    size={21}/></ActionIcon>
            </Group>
            <DeleteModal opened={deleteModalOpened} close={deleteModalCtl.close} profileId={deleteProfileId}/>
        </>
    )
}