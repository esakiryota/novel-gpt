import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Link, useLoaderData } from 'react-router-dom';
import { getNovel, getCommentsOnNovel, createComment, deleteComment, updateComment, putFavoriteToNovel, putDeleteFavoriteToNovel, putReadLaterToNovel, putDeleteReadLaterToNovel } from '../../connection'
import { getAuth } from '../../helper'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { logDOM } from '@testing-library/react';
import PersonIcon from '@mui/icons-material/Person';

export async function loader({ params }) {
  const novel_res = await getNovel(params.id);
  const comments_res = await getCommentsOnNovel(params.id)
  if (!novel_res.ok || !comments_res.ok) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const novel = await novel_res.json()
  const comments = await comments_res.json()
  let favorite = false
  let read_later = false

  const { auth, user } = await getAuth()

  for (let i = 0; i < novel.favorite.length; i++) {
    if (novel.favorite[i].pk == user.pk) {
      favorite = true;
    }
  }

  for (let i = 0; i < novel.read_later.length; i++) {
    if (novel.read_later[i].pk == user.pk) {
      read_later = true
    }
  }


  return { novel, comments, auth, user, favorite, read_later }
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



export default function Novel() {
  const { novel, comments, auth, user, favorite, read_later } = useLoaderData();

  const [comment_value, setCommentValue] = React.useState({ "title": "", "content": "" })
  const [comment_error, setCommentError] = React.useState(false);
  const [comments_state, setCommentsState] = React.useState(comments)
  const [delete_error, setDeleteError] = React.useState(false)
  const [update_error, setUpdateError] = React.useState(false)
  const [edit_mode, setEditMode] = React.useState(-1)
  const [favorite_state, setFavoriteState] = React.useState(favorite)
  const [read_later_state, setReadLaterState] = React.useState(read_later)
  const [comment_edit_value, setCommentEditValue] = React.useState({ "title": "", "content": "" })

  const onClickCreateComment = async (e) => {
    console.log(user.pk, novel.pk, comment_value);
    const res = await createComment(user.pk, novel.pk, comment_value)
    if (!res.ok) {
      setCommentError(true)
    } else {
      const comment = await res.json()
      setCommentsState([...comments_state, comment])
      setCommentValue({ ...comment_value, "title": "", "content": "" })
    }
  }

  const onClickUpdateComment = async (pk) => {
    const res = await updateComment(novel.pk, user.pk, pk, comment_edit_value)
    if (!res.ok) {
      setUpdateError(true)
      throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
    } else {
      const comment = await res.json()
      for (let i = 0; i < comments_state.length; i++) {
        if (comments_state[i].pk === pk) {
          comments_state[i].title = comment.title;
          comments_state[i].content = comment.content;
        }
      }
      setCommentsState(comments_state)
      setEditMode(-1)
    }
  }

  const handleDeleteClick = async (pk) => {
    const res = await deleteComment(novel.pk, user.pk, pk)
    if (!res.ok) {
      setDeleteError(true)
    } else {
      setCommentsState(
        comments_state.filter((comment, index) => (comment["pk"] !== pk))
      )
    }
  }

  const handleEditClick = async (pk, title, content) => {
    setEditMode(pk)
    setCommentEditValue({ "title": title, "content": content })
  }

  const handleEditCancelClick = async (pk) => {
    setEditMode(-1)
  }

  const handleFavoriteClick = async (pk) => {
    const res = await putFavoriteToNovel(novel.pk, user.pk)
    if (!res.ok) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    setFavoriteState(true)
  }

  const handleDeleteFavoriteClick = async (pk) => {
    const res = await putDeleteFavoriteToNovel(novel.pk, user.pk)
    if (!res.ok) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    const favorite = await res.json()
    setFavoriteState(false)

  }

  const handleReadLaterClick = async (pk) => {
    const res = await putReadLaterToNovel(novel.pk, user.pk)
    if (!res.ok) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    setReadLaterState(true)
  }

  const handleDeleteReadLaterClick = async (pk) => {
    const res = await putDeleteReadLaterToNovel(novel.pk, user.pk)
    if (!res.ok) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    const favorite = await res.json()
    setReadLaterState(false)
  }


  return (
    <>
      <Paper>
        <Grid sx={{ margin: 3, fontWeight: "bold", padding: 3 }}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              <StrToDate date={novel["created_at"]} />
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            投稿者: <Link to={`/profile/${novel["user"]["pk"]}/`}>{novel["user"]["username"]}</Link>
          </Grid>
          <Typography variant="h5" component="div">
            {novel.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {novel.category.map((value, index) => (
              <>
                <Chip label={value["name"]} variant="outlined" sx={{ margin: 0.5 }} />
              </>
            ))}
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {novel["content"]}
          </Typography>
        </Grid>
        <Grid>
          <Typography sx={{ fontSize: 14, padding: 4, margin: 3 }} color="text.secondary" gutterBottom>
            {auth &&
              <>
                {favorite_state ?
                  <IconButton edge="end" aria-label="comments"><FavoriteBorderIcon onClick={(e) => handleDeleteFavoriteClick(e)} sx={{ color: "pink" }} /></IconButton>
                  :
                  <IconButton edge="end" aria-label="comments"><FavoriteBorderIcon onClick={(e) => handleFavoriteClick(e)} /></IconButton>
                }
                {read_later_state ?
                  <IconButton edge="end" aria-label="comments"><StarIcon onClick={(e) => handleDeleteReadLaterClick(e)} sx={{ color: "yellow" }} /></IconButton>
                  :
                  <IconButton edge="end" aria-label="comments"><StarIcon onClick={(e) => handleReadLaterClick(e)} /></IconButton>
                }
              </>
            }
          </Typography>
        </Grid>
        <Divider />
        <Grid>
          <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
            {comments_state.map((value, index) => (
              <>
                {edit_mode !== value["pk"] ?
                  <ListItem alignItems="flex-start" secondaryAction={
                    auth &&

                    <>
                      {value["user"]["pk"] === user.pk &&
                        <>
                          <IconButton edge="end" aria-label="comments">
                            <ModeEditIcon onClick={(e) => handleEditClick(value["pk"], value["title"], value["content"])} />
                          </IconButton>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon onClick={(e) => handleDeleteClick(value["pk"])} />
                          </IconButton>
                        </>
                      }
                    </>

                  }>
                    <ListItemAvatar>
                      <Avatar alt={value["user"].username} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={value["title"]}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {value["user"].username} -
                          </Typography>
                          {value["content"]}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  :
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="タイトル"
                      sx={{ margin: 3 }}
                      defaultValue={comment_edit_value["title"]}
                      onChange={(e) => setCommentEditValue({ ...comment_edit_value, "title": e.target.value })}
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="内容"
                      multiline
                      rows={4}
                      defaultValue={comment_edit_value["content"]}
                      sx={{ margin: 3 }}
                      onChange={(e) => setCommentEditValue({ ...comment_edit_value, "content": e.target.value })}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickUpdateComment(value["pk"])}>
                      Send
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => handleEditCancelClick(e)}>
                      Cancel
                    </Button>
                  </FormControl>

                }
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Grid>
        {auth &&
          <>
            {comment_error && <Alert severity="error">エラーが起きています</Alert>}
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-flexible"
                label="タイトル"
                sx={{ margin: 3 }}
                defaultValue={comment_value["title"]}
                onChange={(e) => setCommentValue({ ...comment_value, "title": e.target.value })}
              />
              <TextField
                id="outlined-multiline-static"
                label="内容"
                multiline
                rows={4}
                defaultValue={comment_value["content"]}
                sx={{ margin: 3 }}
                onChange={(e) => setCommentValue({ ...comment_value, "content": e.target.value })}
              />
              <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickCreateComment(e)}>
                Send
              </Button>
            </FormControl>
          </>
        }
      </Paper>
    </>
  )
}
