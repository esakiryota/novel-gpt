
const api_url = "http://54.238.255.127/api/v.1.0/";
// const api_url = "http://localhost:8080/api/v.1.0/"

// 小説単体系
//========================================================

export async function getNovel(pk) {
    const result = await fetch(api_url + `novels/${pk}/`);
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function createNovel(value) {
    const params = {"method": "POST", "body": JSON.stringify(value)}
    const result = await fetch(api_url + `novels/`, params);
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function updateNovel(value, pk) {
    const params = {"method": "POST", "body": JSON.stringify(value)}
    const result = await fetch(api_url + `novels/${pk}/edit/`, params);
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function deleteNovel(pk) {
    const params = {"method": "POST"}
    const result = await fetch(api_url + `novels/${pk}/delete/`, params);
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

//========================================================



// 小説複数形
//========================================================

export async function getNovels() {
    const result = await fetch(api_url + "novels/");
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function getNovelsBySearch(value) {
    const params = {method : "POST", body : JSON.stringify(value)};
    const result = await fetch(api_url + `novels/search/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function getNovelsByUser(id) {
    const result = await fetch(api_url + `novels/user/${id}`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function getNovelsByFavorites() {
    const result = await fetch(api_url + `novels/favorite/`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function getAccountNovelsByFavorite(pk) {
    
    const params = {method: "POST"}
    const result = await fetch(api_url + `users/${pk}/favorite/`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function getAccountNovelsByReadLater(pk) {
    
    const params = {method: "POST"}
    const result = await fetch(api_url + `users/${pk}/read-later/`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function getAccountNovels(pk) {
   
}

//========================================================



// ユーザー系
//========================================================

export async function login(value) {
    const params = {method : "POST", body : JSON.stringify(value)};
    const result = await fetch(api_url + `login/`, params);
    return result
}

export async function register(value) {
    const params = {method : "POST", body : JSON.stringify(value)};
    const result = await fetch(api_url + `register/`, params);
    return result
}

export async function getUser(pk) {
    const result = await fetch(api_url + `users/${pk}/`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function updateUser(pk, value) {
    const params = {method : "POST", body: JSON.stringify(value)};
    const result = await fetch(api_url + `users/${pk}/edit/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function deleteUser(pk) {
    return 0;
}

export async function getUserFollow(pk) {
    const params = {method: "GET"}
    const result = await fetch(api_url + `users/${pk}/follow/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function getUserFollower(pk) {
    const params = {method: "GET"}
    const result = await fetch(api_url + `users/${pk}/follower/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function postUserFollow(pk, follow_pk) {
    const params = {method: "POST", body : JSON.stringify(follow_pk)}
    const result = await fetch(api_url + `users/${pk}/follow/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function postUserFollowDelete(pk, follower_pk) {
    const params = {method: "DELETE", body : JSON.stringify(follower_pk)}
    const result = await fetch(api_url + `users/${pk}/follow/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

//========================================================



//システム系
//========================================================

export async function getCategories() {
    const result = await fetch(api_url + `categories/`);
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function putFavoriteToNovel(novel_pk, user_pk) {
    const params = {method: "POST"}
    const result = await fetch(api_url + `novels/${novel_pk}/favorites/${user_pk}/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function putDeleteFavoriteToNovel(novel_pk, user_pk) {
    const params = {method: "DELETE"}
    const result = await fetch(api_url + `novels/${novel_pk}/favorites/${user_pk}/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function putReadLaterToNovel(novel_pk, user_pk) {
    const params = {method: "POST"}
    const result = await fetch(api_url + `novels/${novel_pk}/read-later/${user_pk}/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function putDeleteReadLaterToNovel(novel_pk, user_pk) {
    const params = {method: "DELETE"}
    const result = await fetch(api_url + `novels/${novel_pk}/read-later/${user_pk}/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}


export async function getFavoritesOnNovel(pk) {
    const params = {method: "POST"};
    const result = await fetch(api_url, `novels/${pk}/favorites/`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result
}

export async function sendEmail(value) {
    const params = {method: "POST", body : JSON.stringify(value)}
    const result = await fetch(api_url + `send-email/`, params)
    return result
}

//========================================================


// コメント系

//========================================================


export async function getCommentsOnNovel(pk) {
    const result = await fetch(api_url + `novels/${pk}/comments`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}


export async function getCommentsByUser(pk) {
    const result = await fetch(api_url + `profile/${pk}/comments`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}
 
export async function createComment(user_pk, novel_pk, value) {
    const params = {method: "POST", body: JSON.stringify(value)}
    const result = await fetch(api_url + `novels/${novel_pk}/comments/${user_pk}/create/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result 
}

export async function deleteComment(novel_pk,user_pk,pk) {
    const result = await fetch(api_url + `novels/${novel_pk}/comments/${user_pk}/${pk}/delete/`)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}

export async function updateComment(novel_pk, user_pk, pk, value) {
    const params = {method: "POST", body: JSON.stringify(value)}
    const result = await fetch(api_url + `novels/${novel_pk}/comments/${user_pk}/${pk}/update/`, params)
    if (!result.ok) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
    }
    return result;
}
//========================================================


