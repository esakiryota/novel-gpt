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
import TopBar from '../parts/topbar';
import NovelGridList from '../parts/grid_novels'
import { textAlign } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import { getAuth } from '../../helper'
import levonia from '../images/top.jpeg'

export async function loader() {
    const { auth, user } = await getAuth()
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { auth, width, height }
}

function Top() {
    const { auth, width, height } = useLoaderData()

    const [width_state, setWidthState] = React.useState(width);
    const [height_state, setHeightState] = React.useState(height);
    React.useLayoutEffect(() => {
        const updateSize = () => {
            setWidthState(window.innerWidth);
            setHeightState(window.innerHeight);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, [])

    const TopPageView = styled(Paper)(({ theme }) => ({
        backgroundImage: `url(${process.env.PUBLIC_URL + '/top.png'})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: -30,
        width: width_state,
        height: height_state,
        '&::before': {
            position: "absolute",
            left: 0,
            top: 63,
            width: width_state,
            height: height_state,
            backgroundColor: "rgba(0,0,0,.5)",
            content: `''`,
        }
    }))

    return (
        <TopPageView>
            <Typography variant="h6" component="div" sx={{ textAlign: "center", verticalAlign: 'center', position: "relative", top: "20%", fontWeight: "bold", fontSize: "40px", color: "white" }}>
            <img src='/levonia.png'/><br /><span style={{ fontSize: "30px" }}>〜AI小説のシェアプラットフォーム〜</span>
                {
                    !auth &&
                    <>
                        <br /><Link to={"/login"} style={{ color: "black", textDecoration: "none" }}><Button variant="contained" style={{backgroundColor: 'blue'}}>ログイン</Button></Link>
                        <br /><Link to={"/register"} style={{ color: "black", textDecoration: "none" }}><Button variant="contained"  style={{backgroundColor: 'blue'}}>アカウント作成</Button></Link>
                    </>
                }
                <br /><Link to={"/category"} style={{ color: "black", textDecoration: "none" }}><Button variant="contained"  style={{backgroundColor: 'blue'}}>AI小説を読む</Button></Link>
            </Typography>
        </TopPageView>
    )
}

export default Top;