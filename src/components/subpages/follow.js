import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLoaderData, redirect } from 'react-router-dom';
import { getNovels, getUserFollow } from '../../connection'
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import { getAuth } from '../../helper';
import TopBar from '../parts/topbar';

export async function loader({ params }) {
    const { auth, user } = await getAuth();
    let users = []
    if (auth) {
        const res = await getUserFollow(params.id);
        if (!res.ok) {
            throw new Response("Not Found", { status: 404 });
        }
        users = await res.json();
    } else {
        return redirect("/login");
    }
    return { users };
}



export default function ProfileFollowList() {

    const { users } = useLoaderData()

    return (
        <Box>
            <TopBar name="フォローしている人" />
            <Grid container spacing={3}>
                {users.map((value, index) => (
                    <Grid item xs={12} md={4} style={{ display: 'flex' }}>
                        <Link to={"/profile/" + value["pk"]} style={{ width: "100%", textDecoration: "none", color: "black" }}>
                            <Paper sx={{ width: "100%", }} style={{ padding: 3, textAlign: "center", marginBottom: 5 }}>
                                <Grid style={{ padding: 10, margin: 3 }}>
                                    <Typography variant="h6" component="div" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Avatar
                                            sx={{ bgcolor: "grey" }}
                                            alt="Remy Sharp"
                                            src="/broken-image.jpg"
                                        >
                                            <PersonIcon />
                                        </Avatar>
                                    </Typography>
                                    <Grid>
                                        <Typography variant="h6" component="div" >
                                            {value.username}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }} >
                                            {value.self_introduction}
                                        </Typography>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <Link style={{ textDecoration: 'none', color: "black", fontSize: 14 }}>
                                                コメント<br />
                                                {value.comments.length}
                                            </Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Link to={`/profile/${value.pk}/follow/`} style={{ textDecoration: 'none', color: "black" , fontSize: 14}}>
                                                フォロー<br />
                                                {value.follow.length}
                                            </Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Link to={`/profile/${value.pk}/follower/`} style={{ textDecoration: 'none', color: "black", fontSize: 14 }}>
                                                フォロワー<br />
                                                {value.follower.length}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}