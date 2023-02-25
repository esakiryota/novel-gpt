import Box from '@mui/material/Box';
import * as React from 'react';
import { getAccountNovelsByReadLater } from '../../connection';
import {getAuth} from '../../helper'
import { useLoaderData, redirect } from 'react-router-dom';
import TopBar from '../parts/topbar';
import NovelGridList from '../parts/grid_novels'

export async function loader() {
    const {auth, user} = await getAuth();
    let novels = []
    if (auth) {
        const res = await getAccountNovelsByReadLater(user.pk);
        if (!res.ok) {
            throw new Response("Not Found", { status: 404 });
        }
        novels = await res.json();
    } else {
        return redirect('/login')
    }
    return {novels};
}

export default function ProfileReadLater() {
    const {novels} = useLoaderData()
    return (
        <Box>
            <TopBar name="あとで見る小説" />
            <NovelGridList novels={novels} />
        </Box>
    )
}