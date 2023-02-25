import Box from '@mui/material/Box';
import * as React from 'react';
import { getAccountNovelsByFavorite } from '../../connection';
import {getAuth} from '../../helper'
import { redirect, useLoaderData } from 'react-router-dom';
import TopBar from '../parts/topbar';
import NovelGridList from '../parts/grid_novels'

export async function loader() {
    const {auth, user} = await getAuth();
    let novels = []
    if (auth) {
        const res = await getAccountNovelsByFavorite(user.pk);
        if (!res.ok) {
            throw new Response("Not Found", { status: 404 });
        }
        novels = await res.json();
    } else {
        return  redirect("/login");
    }
    return {novels};
}

export default function ProfileFavorite() {
    const {novels} = useLoaderData()
    return (
        <Box>
            <TopBar name={"お気に入り小説"}/>
            <NovelGridList novels={novels}/>
        </Box>
    )
}