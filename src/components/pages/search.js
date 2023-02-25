import Box from '@mui/material/Box';
import * as React from 'react';
import { getNovelsBySearch } from '../../connection';
import {getAuth} from '../../helper'
import { redirect, useLoaderData } from 'react-router-dom';
import TopBar from '../parts/topbar';
import NovelGridList from '../parts/grid_novels'

export async function loader({request}) {
    const url = new URL(request.url);
    const str = url.searchParams.get("str");
    const condition = { "str": str, "categories": [], "order_by": "created_at" , "page": 0}
    const res = await getNovelsBySearch(condition);
    if (!res.ok) {
        throw new Response("Not Found", { status: 404 });
    }
    const novels = await res.json()
    return {novels};
}

export default function SearchNovels() {
    const {novels} = useLoaderData()
    return (
        <Box>
            <TopBar name={"小説検索"}/>
            <NovelGridList novels={novels}/>
        </Box>
    )
}