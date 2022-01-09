import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from '@mui/icons-material/Add';
import { Grid, Box, Container, IconButton } from "@mui/material";
import { getBlogPosts } from "./storage";
import { useState } from "react";
import Post from "./post";
import { Link } from 'react-router-dom';


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
  const [posts] = useState(getBlogPosts());
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
        <IconButton component={Link} to="/addPost"> <AddIcon /> </IconButton>
      </Grid>
    </div>
  );
}

export default App;
