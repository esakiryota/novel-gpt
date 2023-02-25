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
import { Link, redirect, useFetcher, useNavigate } from 'react-router-dom';
import { login } from '../../connection'
import Alert from '@mui/material/Alert'

const error = false;

const theme = createTheme();

export default function Login() {
  const navigator = useNavigate()
  const fetcher = useFetcher();
  const [auth, setAuth] = React.useState(false);
  const [auth_error, setAuthError] = React.useState(0);
  const onClickLogin = async (e) => {
    const res = await login(value);
    if (!res.ok) {
      console.log(res.ok);
      setAuthError(1);
    } else {
      const resjson = await res.json()
      const username = resjson["username"]
      const id = resjson["pk"]
      document.cookie = "username=" + username;
      document.cookie = "userid=" + id;
      window.location.href = '/';
    }
  }

  let value = {
    "email": "",
    "password": "",
  }




  return (
    <>
      <fetcher.Form method="post">
        
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
                ログイン
              </Typography>
              <Box sx={{ mt: 3 }}>
              {auth_error == 1 && <Alert severity="error">正しいメールアドレスとパスワードを入力してください。</Alert>}
                <Grid container spacing={2}>
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
                  // type="submit"
                  onClick={onClickLogin}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ログイン
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/register" variant="body2">
                      アカウントを作成
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      </fetcher.Form>
    </>
  );
}