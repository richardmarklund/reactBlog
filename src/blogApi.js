import dotenv from "dotenv";
dotenv.config()

const url = process.env.API_SERVER_URL

export const loginUser = async (username, password) => {
  return await fetch(`${url}/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
};

export async function fetchPosts() {
  const res = await fetch(`${url}/getPosts`);
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

export const addPost = async (post, items, setItems) => {
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
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      post.id = data;
      setItems([post, ...items]);
    });
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