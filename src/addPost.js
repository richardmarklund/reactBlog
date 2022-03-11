import { Container, Button, Box } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useItems } from "./PostState";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function AddBlogPostComponent() {
  const [blogPost, setBlogPost] = useState("");
  const [items, setItems] = useItems();

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            fetch(`http://192.168.1.2:3001/image`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `http://192.168.1.2:3001/image/${res}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const addPost = async (post) => {
    await fetch("http://192.168.1.2:3001/post", {
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

  return (
    <Box>
      <Box pt={3}>
        <Container>
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
            }}
            editor={Editor}
            data={blogPost}
            onChange={(event, editor) => {
              setBlogPost(editor.getData());
            }}
          />
        </Container>
        <Box />
        <Box />
        <Container>
          <Button variant="text" component={Link} to="/">
            Cancel
          </Button>
          <Button
            variant="text"
            component={Link}
            to="/"
            onClick={() => {
              console.log(blogPost.substring(blogPost.search(`</h1>`)+5))
              addPost({
                topic: blogPost.substring(4, blogPost.search(`</h1>`)),
                body: blogPost.substring(blogPost.search(`</h1>`)+5),
                date: moment().format(`YYYY-DD-MM`),
              });
            }}
          >
            Save
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export { AddBlogPostComponent };
