import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import HandymanIcon from '@mui/icons-material/Handyman';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { Outlet, Link, useLoaderData, NavLink, redirect, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

const pages = ['Products', 'Pricing', 'Blog'];

export async function loader() {
    let auth = false;
    let username = "";
    let userid = "";
    let cookies = '';
    let cookieArray = new Array();
    let result = new Array();
    cookies = document.cookie;
    console.log(cookies);
    if (cookies) {
        cookieArray = cookies.split('; ');
        cookieArray.forEach(data => {
            data = data.split('=');
            result[data[0]] = data[1];
        });
    }
    if ("username" in result) {
        auth = true;
        username = result.username;
        userid = result.userid;
    }

    return { auth, username, userid };
}

const sidebar_list = [
    ['TOP', '/'],
    ['AI小説', "/category"],
]

const default_list = [
    ['お問い合わせ', "/contact"],
    ["始め方", "/start"],
    ["利用規約", "/terms"],
]

const sns_list = [
    ['Twitter', ""],
    ["facebook", ""],
]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Footer() {

    return (
        <>
          <Divider />
          <Box sx={{marginTop: 5, marginLeft: 10, marginBottom: 5}}>
          <Box sx={{fontWeight: "bold", fontSize: 24}}>
            <img src="/logo.png" />
            <Grid container spacing={2}>
                  <Grid item xs={4}>
                  <Box sx={{fontWeight: "bold", fontSize: 18}}>ガイド</Box>
                  {
                default_list.map((value, index) => (
                    <Box><Button color="inherit"><Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button></Box>
                ))
            }
                  </Grid>
                  <Grid item xs={4}>
                  <Box sx={{fontWeight: "bold", fontSize: 18}}>コンテンツ</Box>
                  {
            sidebar_list.map((value, index) => (
                    <Box><Button color="inherit"><Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button></Box>
                ))
            }
                  </Grid>
                  <Grid item xs={4}>
                  <Box sx={{fontWeight: "bold", fontSize: 18}}>SNS</Box>
                  {
                sns_list.map((value, index) => (
                    <Box><Button color="inherit"><Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button></Box>
                ))
            }
                  </Grid>
            </Grid>
          </Box>
          </Box>
        </>
    )
}


function PositionedMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const unauth_list = [
        ['ログイン', '/login'],
        ['アカウント作成', '/register'],
    ]

    const auth_list = [
        ['プロフィール', '/profile'],
        ['小説投稿', '/profile/create-novel'],
        ['あとで見る小説', '/profile/read-later'],
        ['お気に入り小説', '/profile/favorite'],
        ['ログアウト', '/logout'],
    ]

    const menu = (
        <>
            {
                props.auth ?
                    <>
                        {auth_list.map((value, index) => (
                            <Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleClose}>{value[0]}</MenuItem></Link>
                        ))
                        }
                    </>
                    :
                    <>
                        {unauth_list.map((value, index) => (
                            <Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleClose}>{value[0]}</MenuItem></Link>
                        ))
                        }
                    </>
            }
            {
                <>
                    {default_list.map((value, index) => (
                        <Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleClose}>{value[0]}</MenuItem></Link>
                    ))
                    }
                </>
            }
        </>
    );



    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                    sx={{ bgcolor: "grey" }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                >
                    <PersonIcon />
                </Avatar>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    menu
                }

            </Menu>
        </div>
    );
}


function Root(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigator = useNavigate()

    const { auth, username, userid } = useLoaderData();

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            return navigator(`/novels/search?str=${e.target.value}`)
        }
    }

    const drawer = (
        <div>
            <Toolbar>
                <Grid>
                    <Search sx={{}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="小説を検索"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                </Grid>

            </Toolbar>

            <Divider />
            <List>
                {sidebar_list.map((value, index) => (
                    <NavLink to={value[1]} style={{ textDecoration: 'none', color: "black" }}>
                        <ListItem key={value[0]} disablePadding>

                            <ListItemButton selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={value[0]} />

                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
                {
                    auth &&
                    <NavLink to="/profile/create-novel/" style={{ textDecoration: 'none', color: "black" }}>
                        <ListItem key={"新規投稿"} disablePadding>

                            <ListItemButton selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={"新規投稿"} />

                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    return (
        <Box sx={{}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                </Menu>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    <img src="/title_logo.png" style={{height: 25}}/>レボニア（LevoniA）
                    </Typography>
                    <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="小説を検索"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                    {
                        auth && <Box sx={{ display: { xs: 'none', sm: 'block' } }}><Button color="inherit"><Link to="/profile/create-novel/" style={{ textDecoration: 'none', color: "black" }}>新規投稿</Link></Button></Box>
                    }
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                        {sidebar_list.map((value, index) => (
                            <Button color="inherit"><Link to={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button>
                        ))}
                    </Box>
                    <PositionedMenu auth={auth} />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
            >
                <Toolbar />
                <Box style={{ margin: 30 }}>
                    <Outlet style={{ justifyContent: "center", alignItems: "center", width: "100%" }} />
                </Box>
            </Box>
            <Box>
            <Footer />
            </Box>
        </Box>
    );
}

Root.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Root;