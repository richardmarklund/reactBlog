const url = 'http://192.168.1.2:3001'


export async function fetchPosts() {
  const res = await fetch(`${url}/getFirstPosts`);
  return res.json();
}

export const removePost = async (post, setItems) => {
  fetch(`${url}/delete`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ id: post.id }),
  }).then((data) => {
    if (data.ok) {
      fetchPosts().then((result) => {
        setItems(result);
      });
    }
  });
};

export function uploadFile(file, blogPost, setBlogPost) {
  const body = new FormData();
  body.append("image", file);

  fetch(`${url}/image`, {
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
    body: JSON.stringify(post),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      post.id = data;
      setItems([post, ...items]);
    });
};
