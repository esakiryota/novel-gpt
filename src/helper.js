import {getUser} from "./connection"

export async function getAuth() {
    let auth = false;
    let userid = "";
    let user = {}
    let cookies = '';
    let cookieArray = new Array();
    let result = new Array();
    cookies = document.cookie;
    if (cookies) {
        cookieArray = cookies.split('; ');
        cookieArray.forEach(data => {
            data = data.split('=');
            result[data[0]] = data[1];
        });
    }
    if ("username" in result) {
        auth = true;
        userid = result.userid;
        const user_res = await getUser(userid)
        if (!user_res.ok) {
            throw new Response("", {
                status: 404,
                statusText: "Not Found",
              });
        }
        user = await user_res.json()
    }

    return {auth, user}
}