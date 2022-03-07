import { Container, TextField, Button, Box } from "@mui/material";
import moment from "moment";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useItems } from "./PostState";
import JoditEditor from "jodit-react";

function AddBlogPostComponent() {
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [items, setItems] = useItems();
  const editor = useRef(null);

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
      <Box>
        <Container>
          <TextField
            label="Title"
            multiline
            rows={1}
            value={topic}
            onInput={(e) => setTopic(e.target.value)}
          />
        </Container>
      </Box>
      <Box pt={3}>
        <Container>
          <JoditEditor
            ref={editor}
            value={body}
            tabIndex={1}
            onBlur={(newContent) => setBody(newContent)} // preferred to use only this option to update the content for performance reasons
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
            onClick={() =>
              addPost({
                topic: topic,
                body: body,
                date: moment().format("YYYY-MM-DD").toString(),
              })
            }
          >
            Save
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export { AddBlogPostComponent };
