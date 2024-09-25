import {app} from "./socket";
import {runProfile, stopProfile} from "./service/profile-service";


interface ProfileRequest {
    id: string;
    path: string;
}

app.get<{}, {}, {}, ProfileRequest>('/run-profile', async (req, res): Promise<void> => {
    const {id, path} = req.query; // Now `id` and `path` are strongly typed as strings
    await runProfile(id, path);

    res.send('Run Profile Successfully!');
});


app.get<ProfileRequest>('/stop-profile/:id', async (req, res): Promise<void> => {
    const {id} = req.params; // id is strongly typed as string

    await stopProfile(id);

    res.send('Stop Profile Successfully!');
});