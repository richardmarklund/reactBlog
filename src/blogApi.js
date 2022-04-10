const url = 'http://192.168.1.2:3001'

export const loginUser = async (username, password) => {
  return await fetch(`${url}/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
};

export async function fetchPosts(cookies) {
  let res;
  if (cookies?.token != undefined) {
     res = await fetch(`${url}/getPosts`);
  } else {
     res = await fetch(`${url}/getPublishedPosts`);
  }
  return res.json();
}

export const removePost = async (post, setItems) => {
  fetch(`${url}/delete`, {
    method: "DELETE",
    credentials: 'include',
    mode: 'cors',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ id: post.id }),
  }).then((data) => {
    if (data.ok) {
      fetchPosts().then((result) => {
        setItems(result.data);
      });
    }
  });
};

export function uploadFile(file, blogPost, setBlogPost) {
  const body = new FormData();
  body.append("image", file);

  fetch(`${url}/image`, {
    credentials: 'include',
    mode: 'cors',
    method: "post",
    body: body,
  })
    .then((res) => res.json())
    .then((res) => {
      setBlogPost(
        blogPost +
          `<br><img src="${url}/image/${res}" alt="drawing" width="200"/>`
      );
    });
}

export const addPost = async (post, setItems) => {
  await fetch(`${url}/post`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch((err) => console.log(err))
    .then(() => {
      fetchPosts().then(res => {
        setItems(res.data);
        })
    })
};

export const updatePost = async (post, setItems) => {
  await fetch(`${url}/post`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch((err) => console.log(err))
    
  fetchPosts().then(res => {
    setItems(res.data);
    })
};

export const publishPost = async (post) => {
  await fetch(`${url}/publishPost`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch((err) => console.log(err))

};