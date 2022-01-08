import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, TextField, Button, Box } from "@mui/material";
import { Grid } from "@mui/material";
import Post from "./post";
import { getBlogPosts, addBlogPost } from "./storage";
import { useState } from "react";
import moment from "moment";

function TextInputComponent({ handleClick }) {
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
          <Button
            variant="text"
            onClick={() =>
              handleClick({
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
function BlogPostsComponent({ posts }) {
  return (
    <Box>
      <Container>
        <Typography variant="overline">
          <Grid>{posts.map((post) => Post(post))}</Grid>
        </Typography>
      </Container>
    </Box>
  );
}

function App() {
  const [posts, setPosts] = useState(getBlogPosts());
  const handleClick = (post) => {
    setPosts([post, ...posts]);
    console.log(post)
    addBlogPost(post);
  };

  return (
    <div>
      <CssBaseline />
      <Grid container justifyContent="center" align="center">
        <Container>
          <Typography variant="h1">Blog</Typography>
        </Container>
        <Container>
          <Typography variant="overline">
            The personal blog of Richard Marklund
          </Typography>
        </Container>
        <BlogPostsComponent posts={posts} />
        <TextInputComponent handleClick={handleClick} />
      </Grid>
    </div>
  );
}

export default App;
