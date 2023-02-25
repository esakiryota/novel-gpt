import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLoaderData } from 'react-router-dom';
import { getNovels } from '../../connection'
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

function NovelContent(props) {
    const content = props.content;
    var result = content.substr(0, 100);
    if (result.length > 99) {
        result += "..."
    }

    return (
        <>
            {result}
        </>
    )
}

function StrToDate(props) {
    const date = props.date;
    const arr = date.split('T')
    return (
        <>
        {arr[0]}
        </>
    )
}

export default function NovelGridList(props) {

    return (
        <Grid container spacing={3}>
            {props.novels.map((value, index) => (
                <Grid item xs={12} md={4} style={{ display: 'flex' }}>
                    <Link to={"/novel/" + value["pk"]} style={{ width: "100%", textDecoration: "none", color: "black" }}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    <Grid container spacing={2} sx={{display: "flex"}}>
                                        <Grid item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                <StrToDate date={value["created_at"]} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={{ textAlign: "right" }}>
                                        <PersonIcon />
                                        </Grid>
                                        <Grid item xs={3}>
                                            {value["user"]["username"]}
                                        </Grid>
                                        </Grid>
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {value["title"]}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {value["category"].map((category, index) => (
                                        <>
                                            <Chip label={category["name"]} variant="outlined" size="small" sx={{ marginLeft: 1 }} ></Chip>
                                        </>
                                    ))}
                                </Typography>
                                <Typography variant="body2">
                                    <NovelContent content={value["content"]} />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <FavoriteIcon />{value["favorite"].length}<StarIcon />{value["read_later"].length}
                            </CardActions>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}