import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import {Link, useLoaderData, redirect, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getNovelsByUser, deleteNovel,  getCommentsByUser, postUserFollow, postUserFollowDelete, getUserFollow, getUserFollower} from '../../connection'
import TopBar from '../parts/topbar';
import {getAuth} from '../../helper';


export async function loader() {
    const {auth, user} = await getAuth();
    if (!auth) {
        return redirect('/login')
    }
    const profile = user
    const relationship = false
    return { profile, user, relationship}
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

function FollowButton(props) {
    const [check, setCheck] = React.useState(props.relationship)

    const handleFollow = async (e) => {
        const res = await postUserFollow(props.auth.pk, props.user.pk)
        if (res.ok) {
            setCheck(true)
        } else {
            throw new Response("Not Found", { status: 404 });
        }
    }

    const handleDeleteFollow = async (e) => {
        const res = await postUserFollowDelete(props.auth.pk, props.user.pk)
        if (res.ok) {
            setCheck(false)
        } else {
            throw new Response("Not Found", { status: 404 });
        }
    }
    return (
        <>
        {
            check ?
            <Button onClick={handleDeleteFollow}>フォローを外す</Button>
            :
            <Button onClick={handleFollow}>フォローする</Button>
        }
        </>
    )
}


function ProfileCard(props) {
    return (
        <>
        <Paper sx={{ width: "100%", }} style={{ padding: 3, textAlign: "center" ,marginBottom: 5}}>
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
                        {props.user.username}
                    </Typography>
                    <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }} >
                        {props.user.self_introduction}
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Link style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    コメント<br/>
                    {props.comments.length}
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={`/profile/${props.user.pk}/follow/`} style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    フォロー<br/>
                    {props.follow.length}
                    </Link>
                </Grid>
                <Grid item xs={4}>
                <Link to={`/profile/${props.user.pk}/follower/`} style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    フォロワー<br/>
                    {props.follower.length}
                    </Link>
                </Grid>
                </Grid>
            </Grid>
            <Grid>
                {
                    props.auth.pk === props.user.pk ?
                    <Link to={`/profile/${props.user.pk}/edit`}><Button>プロフィール編集</Button></Link>
                    :
                    <FollowButton user={props.user} auth={props.auth} follow={props.follow} follower={props.follower} relationship={props.relationship}/> 
                }
            </Grid>
        </Paper>
        </>
    )
}

function NovelContent(props) {
    const content = props.content;
    var result = content.substr( 0, 100 );
    if (result.length > 99) {
        result += "..."
    }

    return (
        <>
        {result}
        </>
    )
}

function ProfileNovels(props) {
    const navigator = useNavigate()
    const handleDeleteClick = async (id) => {
        const res = await deleteNovel(id);
        if (!res.ok) {
            throw new Response("Not Found", { status: 404 });
        }
        navigator("/profile")
    }


    return (
        <>
        <TopBar name={"投稿した小説"} />
        <Paper sx={{ width: "100%" }}>
            {props.novels.map((value, index) => (
                <>
                    <Grid style={{ display: 'flex', padding: 10, margin: 3 }}>
                        <Grid container sx={{ marginLeft: 3, fontWeight: "bold" }}>
                            <Grid item xs={8} md={8}>
                                <Typography variant="body2" color="text.secondary">
                                   <StrToDate date={value["created_at"]} />
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={4} sx={{ textAlign: "right" }}>
                                {
                                    props.auth.pk === value["user"]["pk"] && 
                                    <><Link to={`/profile/novel/${value["pk"]}/edit`}><ModeEditIcon /></Link><DeleteIcon onClick={(e) => handleDeleteClick(value["pk"])} /></>
                                }
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h5" component="div">
                                    {value["title"]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {value["category"].map((category, index) => (
                                        <><Chip label={category["name"]} variant="outlined" size="small" sx={{ marginLeft: 1 }} ></Chip></>
                                    ))}


                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                                <Typography variant="body2">
                                   <NovelContent content={value["content"]} />
                                   <Link to={`/novel/${value["pk"]}`}>続きを読む</Link>
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Divider />
                </>
            ))}

        </Paper>
        </>
    )
}

function ProfileComments(props) {
    return (
        <>
        <TopBar name={"投稿したコメント"} />
       
        <Paper sx={{ width: "100%" }}>
        {props.comments.map((value, index) => (
            <>
                <Grid style={{ display: 'flex', padding: 10, margin: 3 }}>
                    <Grid container sx={{ marginLeft: 3, fontWeight: "bold" }}>
                        <Grid item xs={8} md={8}>
                            <Typography variant="body2" color="text.secondary">
                            <StrToDate date={value["created_at"]} />
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <Typography >
                                <Link to={`/novel/${ value["novel"]["pk"]}`} style={{textDecoration: "none", color: "black"}}>{value["novel"]["title"]}へ</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h5" component="div">
                                {value["title"]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                            <Typography variant="body2">
                               <NovelContent content={value["content"]} />
                            </Typography>
                        </Grid>

                    </Grid>

                </Grid>
                <Divider />
            </>
        ))}

    </Paper>
    </>
    )
}


export default function Profile() {
    const {profile, user, relationship } = useLoaderData();
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} style={{}}>
                    <ProfileCard user={profile} auth={user} comments={profile.comments} follower={profile.follower} follow={profile.follow} relationship={relationship}/>
                    <ProfileComments comments={profile.comments} />
                </Grid>
                <Grid item xs={12} md={8} style={{}}>
                    <ProfileNovels novels={profile.novels} auth={user} />
                </Grid>
            </Grid>
        </Box>
    )
}