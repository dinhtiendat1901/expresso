import {ActionIcon, Group} from "@mantine/core";
import {IconPlayerPause, IconPlayerPlay, IconTrash} from "@tabler/icons-react";
import React, {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import DeleteModal from "./modal/DeleteModal.tsx";
import profileSlice, {Profile} from "../../store/profile-slice.ts";
import {useAppDispatch} from "../../store";
import axios from "axios";

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
        await axios.get(`${import.meta.env.VITE_PUPPETEER_SERVER_URL}/run-profile`, {
            params: {
                id: profile.id.toString(),
                path: profile.path
            }
        });
        dispatch(profileSlice.actions.setRunning({
            id: profile.id,
            running: true
        }));
    }

    async function handleClickStop() {
        await axios.get(`${import.meta.env.VITE_PUPPETEER_SERVER_URL}/stop-profile/${profile.id}`);
    }


    const actionIcon = profile.running ?
        <ActionIcon variant='subtle' pl='5' pr='5' color='black' onClick={handleClickStop}><IconPlayerPause
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