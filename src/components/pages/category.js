import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLoaderData } from 'react-router-dom';
import { getNovels, getCategories, getNovelsBySearch } from '../../connection'
import TopBar from '../parts/topbar';
import NovelGridList from '../parts/grid_novels'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export async function loader() {
    const condition = { "str": "", "categories": [], "order_by": "created_at", "page": 0 }
    const novels_res = await getNovelsBySearch(condition)
    const categories_res = await getCategories();
    if (!novels_res.ok || !categories_res.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    const novelsjson = await novels_res.json();
    const categoriesjson = await categories_res.json();
    return { novelsjson, categoriesjson };
}


function Category() {
    const homeUrl = process.env.PUBLIC_URL;
    const { novelsjson, categoriesjson } = useLoaderData();
    console.log(novelsjson, categoriesjson);
    const [novels, setNovels] = React.useState(novelsjson);
    const categories_condition = {}
    for (let i = 0; i < categoriesjson.length; i++) {
        categories_condition[categoriesjson[i]] = false;
    }
    const [selected_categories, setSelectedCategories] = React.useState(categories_condition);
    const [all_categories, setAllCategories] = React.useState(true);
    const [writed_str, setWritedStr] = React.useState("");
    const [order_by, setOrderBy] = React.useState("created_at");
    const [page, setPage] = React.useState(0)

    const categories_array = () => {
        const array = [];
        for (let key in selected_categories) {
            if (selected_categories[key]) {
                array.push(key)
            }
        }
        return array;
    }

    const handleClick = async (e) => {
        setPage(0)
        if (selected_categories[e.target.innerText]) {
            selected_categories[e.target.innerText] = false
        } else {
            selected_categories[e.target.innerText] = true
        }
        const cateogries_data = categories_array()
        const condition = { "str": writed_str, "categories": cateogries_data, "order_by": order_by, "page":  0}
        const res = await getNovelsBySearch(condition)
        if (res.ok) {
            const result = await res.json()
            setNovels(result)
        } else {
            throw new Response("", {
                status: 404,
                statusText: "Not Found",
              });
        }
    }

    const handleChangeString = async (e) => {
        setPage(0)
        setWritedStr(e.target.value)
        const cateogries_data = categories_array()
        const condition = { "str": e.target.value, "categories": cateogries_data, "order_by": order_by,  "page":  0 }
        const res = await getNovelsBySearch(condition)
        if (res.ok) {
            const result = await res.json()
            setNovels(result)
        } else {
            throw new Response("", {
                status: 404,
                statusText: "Not Found",
              });
        }
    }

    const handleOrderValue = async (value) => {
        setOrderBy(value);
        setPage(0)
        const cateogries_data = categories_array()
        const condition = { "str": writed_str, "categories": cateogries_data, "order_by": value,  "page":  0 }
        const res = await getNovelsBySearch(condition)
        if (res.ok) {
            const result = await res.json()
            setNovels(result)
        } else {
            throw new Response("", {
                status: 404,
                statusText: "Not Found",
              });
        }
    }

    const handleNovelsClick = async (e) => {
        setPage(page + 1)
        const cateogries_data = categories_array()
        const condition = { "str": writed_str, "categories": cateogries_data, "order_by": order_by,  "page":  page+1 }
        const res = await getNovelsBySearch(condition)
        if (res.ok) {
            const result = await res.json()
            const novels_marge = novels.concat(result)
            setNovels(novels_marge)
            console.log(novels);
        } else {
            throw new Response("", {
                status: 404,
                statusText: "Not Found",
              });
        }
    }


    return (
        <Box>
            <TopBar name={"AI小説"} />
            <Box>
                <Box>
                    {categoriesjson.map((value, index) => (
                        <>
                            <Chip label={value["name"]} variant={selected_categories[value['name']] ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
                        </>
                    ))}
                </Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">表示順</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="created_at"
                        onChange={(e) => handleOrderValue(e.target.value)}
                    >
                        <FormControlLabel value="created_at" control={<Radio />} label="最新" />
                        <FormControlLabel value="favorite" control={<Radio />} label="お気に入り" />
                        <FormControlLabel value="read_later" control={<Radio />} label="あとで読む" />
                    </RadioGroup>
                </FormControl>
                <div>
                    <Paper
                        component="form"
                        sx={{ margin: 2, p: '2px 4px', display: 'flex', alignItems: 'center', }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="検索..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => handleChangeString(e)}
                        />
                    </Paper>
                </div>
            </Box>
            <NovelGridList novels={novels} />
            <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12} sx={{textAlign: "center", margin: 5}}>
            <Button variant="outlined" color="inherit"  style={{ backgroudColor: "black"}} size="large" onClick={handleNovelsClick}>さらに読み込む</Button>
            </Grid>
            </Box>
        </Box>
    )
}

export default Category;