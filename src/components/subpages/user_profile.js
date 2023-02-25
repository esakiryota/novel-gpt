import { getNovelsByUser, getUser,  getCommentsByUser, getUserFollow, getUserFollower} from '../../connection'
import {getAuth} from '../../helper';
import { redirect, useResolvedPath } from 'react-router-dom';


export async function loader({params}) {
    const {auth, user} = await getAuth();
    if (!auth) {
        return redirect('/login')
    }
    const  profile_res = await getUser(params.id)
    if (!profile_res.ok) {
        throw new Response("Not Found", { status: 404 });
    }
    const profile = await profile_res.json()
    let relationship = false;
    for (let i = 0; i < user.follow.length; i++) {
        if (profile.pk === user.follow[i].pk) {
            relationship = true;
        }
    }
    return { profile, user, relationship}
}