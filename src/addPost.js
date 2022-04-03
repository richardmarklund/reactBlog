import { Container, Button, Box, TextField, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useItems } from "./PostState";
import { useCookies } from "react-cookie";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { styled } from "@mui/material/styles";
import { uploadFile, addPost, updatePost } from "./blogApi";

const Input = styled("input")({
  display: "none",
});

const SaveButton = (props) => {
  const [items, setItems] = useItems();
  if (props.oldState) {
    return (
      <Button
        variant="text"
        component={Link}
        to="/"
        onClick={() => {
          updatePost(
            {
              id: props.oldState.id,
              body: props.blogPost,
            },
            setItems
          );
        }}
      >
        Save
      </Button>
    );
  } else {
    return (
      <Button
        variant="text"
        component={Link}
        to="/"
        onClick={() => {
          addPost(
            {
              body: props.blogPost,
              date: moment().format(`YYYY-MM-DD`),
            },
            items,
            setItems
          );
        }}
      >
        Save
      </Button>
    );
  }
};

const AddBlogPostComponent = () => {
  const { state } = useLocation();
  const [blogPost, setBlogPost] = useState(state ? state.body : "");
  const [cookies] = useCookies(["token"]);

  if (cookies.token) {
    return (
      <Box>
        <Grid container sx={{ pt: 4 }}>
          <Grid item xs={6}>
            <Container>
              <TextField
                fullWidth
                id="outlined-textarea"
                rows={30}
                multiline
                value={blogPost}
                onChange={(e) => {
                  setBlogPost(e.target.value);
                }}
              />
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{ maxHeight: 722, height: 722, overflow: "auto" }}
            >
              <Typography component={"span"} align="left">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  children={blogPost}
                />
              </Typography>
            </Paper>
          </Grid>
          <Box />
          <Box />
          <Grid container>
            <Grid item xs={3} sx={{ pl: 4, pt: 1 }}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(f) =>
                    uploadFile(f.target.files[0], blogPost, setBlogPost)
                  }
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={2} sx={{ pt: 1, pl: 6, pb: 1 }} align="right">
              <Button variant="text" component={Link} to="/">
                Cancel
              </Button>
            </Grid>
            <Grid item xs sx={{ pt: 1, pl: 6, pb: 1 }} align="left">
              <SaveButton blogPost={blogPost} oldState={state} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <Typography>You are not allowed here</Typography>;
  }
};

export { AddBlogPostComponent };
