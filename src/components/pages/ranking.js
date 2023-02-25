import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getNovelsByFavorites } from '../../connection';
import { useLoaderData } from 'react-router-dom';
import Chip from '@mui/material/Chip';

export async function loader() {
    const res = await getNovelsByFavorites();
    if (!res.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return res;
}

function Ranking() {
    const novels = useLoaderData();

    return (
        <Box>
            <Paper elevation={3} sx={{padding: 2, marginBottom: 2}} >
                <Grid style={{ display:'flex', justifyContent:'center', padding: 3}}>
                    <Grid >
                        ランキング
                    </Grid>
                </Grid>
            </Paper>
            {novels.map((value, index) => (
            <Paper elevation={3} sx={{padding: 2, marginBottom: 2}} >
                <Grid style={{ display:'flex', padding: 3}}>
                    <Grid sx={{fontWeight: "bold"}}>
                        {index+1}位
                    </Grid>
                    <Grid sx={{marginLeft: 3, fontWeight: "bold"}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {value["created_at"]}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {value["title"]}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {value["category"].map((category, index_2) => (
                                    <><Chip label={category["name"]} variant="outlined" size="small" sx={{ marginLeft: 1 }} ></Chip></>
                                ))}
                            </Typography>
                            <Typography variant="body2">
                            {value["content"]}
                            </Typography>
                    </Grid>
                </Grid>
            </Paper>
            ))}
        </Box>
    )
}

export default Ranking;