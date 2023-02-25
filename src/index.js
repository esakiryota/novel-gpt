import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './components/navigation';
import {loader as rootLoader} from './components/navigation';
import Top from './components/pages/top';
import {loader as topLoader} from './components/pages/top';
import Contact from './components/pages/contact';
import Novel from './components/pages/novel';

import {loader as novelLoader} from './components/pages/novel';
import Ranking from './components/pages/ranking';

import {loader as rankingLoader} from './components/pages/ranking';
import Start from './components/pages/start';
import Terms from './components/pages/terms';
import Category from './components/pages/category';
import {loader as categoryLoader} from './components/pages/category';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import {loader as logoutLoader} from './components/auth/logout';
// import {action as loginAction} from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/subpages/profile';
import {loader as profileLoader} from './components/subpages/profile';
import ProfileFavorite from './components/subpages/favorite';
import {loader as profileFavoriteLoader} from './components/subpages/favorite';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error";
import { CookiesProvider } from "react-cookie";
import ProfileReadLater, {loader as readLaterLoader} from './components/subpages/read_later';

import CreateNovel from './components/crud/create'
import {loader as createNovelLoader} from './components/crud/create'
import UpdateNovel from './components/crud/update'
import { loader as updateNovelLoader } from './components/crud/update'
import UpdateProfile from './components/auth/update'
import {loader as updateProfileLoader} from './components/auth/update'
import SearchNovels from './components/pages/search'
import {loader as SearchNovelsLoader} from './components/pages/search'
import {loader as UserProfileLoader} from './components/subpages/user_profile'
import {loader as ProfileFollowLoader} from './components/subpages/follow'
import {loader as ProfileFollowerLoader} from './components/subpages/follower'
import ProfileFollowList from './components/subpages/follow'
import ProfileFollowerList from './components/subpages/follower'
import { createTheme, ThemeProvider } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));
const homeUrl = process.env.PUBLIC_URL;

const theme = createTheme({
  typography: {
    fontFamily: [
      'Shippori Mincho',
      'cursive',
    ].join(','),
  },});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [{
      errorElement : <ErrorPage />,
      children: [
      { 
        index: true, 
        loader: topLoader,
        element: <Top /> },
      {
        path: "category",
        element: <Category/>,
        loader: categoryLoader,
      },
      {
        path: "ranking",
        element: <Ranking />,
        loader: rankingLoader,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "start",
        element: <Start />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        loader: logoutLoader,
      },
      {
        path: "/novel/:id",
        loader: novelLoader,
        element: <Novel />,
      },
      {
        path: "/profile",
        loader: profileLoader,
        element: <Profile />,
      },
      {
        path: "/profile/:id",
        loader: UserProfileLoader,
        element: <Profile />,
      },
      {
        path: "/profile/:id/follow/",
        loader: ProfileFollowLoader,
        element: <ProfileFollowList />,
      },
      {
        path: "/profile/:id/follower/",
        loader: ProfileFollowerLoader,
        element: <ProfileFollowerList />,
      },
      {
        path: "profile/favorite/",
        element: <ProfileFavorite />,
        loader: profileFavoriteLoader,
      }, 
      {
        path: "profile/read-later/",
        element: <ProfileReadLater />,
        loader: readLaterLoader,
      },
      {
        path: "profile/create-novel/",
        element: <CreateNovel />,
        loader: createNovelLoader,
      },
      {
        path: "profile/novel/:id/edit/",
        element: <UpdateNovel />,
        loader: updateNovelLoader,
      },
      {
        path: "profile/:id/edit/",
        element: <UpdateProfile />,
        loader: updateProfileLoader,
      },
      {
        path: "novels/search/",
        element: <SearchNovels />,
        loader: SearchNovelsLoader,
      },
      ]
    }
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);