import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Form , redirect, useNavigate} from 'react-router-dom';
import {register} from '../../connection'
import Alert from '@mui/material/Alert'

const theme = createTheme();

export default function Register() {
  const navigator = useNavigate()

  const [auth, setAuth] = React.useState(false);
  const [auth_error, setAuthError] = React.useState({});
  const onClickRegister = async (e) => {
    const res = await register(value);
    if (!res.ok) {
      setAuthError(res.json());
    } else {
      const resjson = await res.json()
      const username = resjson["username"];
      document.cookie = "username=" + username;
      navigator('/');
    }
  }

  const value = {
    "username": "",
    "email": "",
    "password": "",
  }


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            アカウント作成
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
           
            <Grid container spacing={2}>
            {"username" in auth_error && <Alert severity="error">正しい名前を入れてください。</Alert>}
            <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="名前"
                  autoFocus
                  onChange={(e) => value["username"] = e.target.value}
                />
              </Grid>
              {"email" in auth_error && <Alert severity="error">正しいメールアドレスを入れてください。</Alert>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => value["email"] = e.target.value}
                />
              </Grid>
              {"password" in auth_error && <Alert severity="error">正しいパスワードを入れてください。</Alert>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => value["password"] = e.target.value}
                />
              </Grid>
            </Grid>
            <Button
              onClick={onClickRegister}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              アカウントを作成
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to="/login" variant="body2">
                 ログインする
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}