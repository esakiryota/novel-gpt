import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit} from 'react-router-dom';

export async function loader() {
    document.cookie = "username=; max-age=0";
    document.cookie = "userid=; max-age=0";
    window.location.href = "/";
    return 0;
  }