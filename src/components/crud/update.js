import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { updateNovel, getCategories, getNovel } from "../../connection";
import {useLoaderData, useNavigate, redirect} from 'react-router-dom';
import TopBar from '../parts/topbar';
import {getAuth} from '../../helper'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}





export async function loader({params}) {
  const {auth, user} = await getAuth();
    if (!auth) {
        return redirect('/login');
    }
  const res = await getCategories();
  const novel_res = await getNovel(params.id)
  if (!res.ok || !novel_res.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const categories = await res.json();
  const novel = await novel_res.json();
  return {auth, user, categories, novel};
}






export default function UpdateNovel() {
  const homeUrl = process.env.PUBLIC_URL;
  const [novel_error, setNovelError] = React.useState({})
  const theme = useTheme();
  const {auth,user, categories, novel} = useLoaderData();
  const navigator = useNavigate();

  const category_array = [];

  for (let i = 0; i < novel["category"].length; i++) {
    category_array.push(novel["category"][i]["name"])
  }

  const [selected_categories, setSelectedCategories] = React.useState(category_array);
  const [novelValues, setNovelValues] = React.useState({"title": novel["title"], "user_id": user.pk, "content": novel["content"], "categories": []});


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onClickCreateNovel = async (e) => {
    novelValues["categories"] = selected_categories;
    const res = await updateNovel(novelValues, novel.pk);
    const resjson = await res.json()
    if (!res.ok) {
      setNovelError(resjson);
    } else {
      navigator('/profile');
    }
  }



  return (
    <Box>
      <TopBar name="小説編集" />
      <Paper>
        <FormControl fullWidth>
          <TextField
            id="outlined-multiline-flexible"
            label="タイトル"
            sx={{ margin: 3 }}
            name="title"
            onChange={(e) => setNovelValues({...novelValues, "title" : e.target.value})}
            value={novelValues["title"]}
          />
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selected_categories}
                onChange={handleChange}
                sx={{ margin: 3 }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((value) => (
                  <MenuItem
                    key={value["name"]}
                    value={value["name"]}
                    style={getStyles(value["name"], selected_categories, theme)}

                  >
                    {value["name"]}
                  </MenuItem>
                ))}
              </Select>
          <TextField
            id="outlined-multiline-static"
            label="文章"
            multiline
            rows={4}
            sx={{ margin: 3 }}
            name="content"
            onChange={(e) => setNovelValues({...novelValues,"content" : e.target.value})}
            value={novelValues["content"]}
          />
          <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickCreateNovel(e)}>
            投稿
          </Button>
        </FormControl>
      </Paper>
    </Box>

  )
}