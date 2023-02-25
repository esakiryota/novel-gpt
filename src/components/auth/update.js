import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import { updateUser } from '../../connection'
import { useLoaderData, useNavigate, redirect } from 'react-router-dom';
import {getAuth} from '../../helper'


export async function loader({ params }) {
    const {auth, user} = await getAuth();
    if (!auth) {
        return redirect('/login')
    }
    return { auth, user }
}

export default function UpdateProfile() {
    const { auth, user } = useLoaderData();
    const navigator = useNavigate();
    const [userValue, setUserValue] = React.useState({ "username": user.username, "self_introduction": user.self_introduction });
    const [updateError, setUpdateError] = React.useState(0);


    const onClickUserForm = async (e) => {
        const res = await updateUser(user.pk, userValue);
        if (!res.ok) {
            setUpdateError(1);
        } else {
            const resjson = await res.json()
            const username = resjson["username"];
            const id = resjson["pk"]
            document.cookie = "username=" + username;
            document.cookie = "userid=" + id;
            navigator("/profile")
        }
    }
    return (
        <Box>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} >
                <Grid style={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
                    <Grid >
                        プロフィール編集
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                <FormControl fullWidth>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="名前"
                        defaultValue={user.username}
                        sx={{ margin: 3 }}
                        onChange={(e) => setUserValue({ ...userValue, "username": e.target.value })}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="自己紹介"
                        multiline
                        rows={4}
                        defaultValue={user.self_introduction}
                        sx={{ margin: 3 }}
                        onChange={(e) => setUserValue({ ...userValue, "self_introduction": e.target.value })}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickUserForm(e)} >
                        Send
                    </Button>
                </FormControl>
            </Paper>
        </Box>

    )
}