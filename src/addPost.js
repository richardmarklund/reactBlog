import { Container, TextField, Button, Box } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { addBlogPost } from "./storage";
import { Link } from "react-router-dom";

const addPost = (post) => {
  addBlogPost(post);
};

function AddBlogPostComponent(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <Box>
      <Box>
        <Container>
          <TextField
            label="Title"
            multiline
            rows={1}
            value={title}
            onInput={(e) => setTitle(e.target.value)}
          />
        </Container>
      </Box>
      <Box pt={3}>
        <Container>
          <TextField
            label="Content"
            multiline
            rows={10}
            value={content}
            onInput={(e) => setContent(e.target.value)}
          />
        </Container>
        <Box />
        <Box></Box>
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
                title: title,
                content: content,
                date: moment().format("YYYY-MM-DD"),
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
