import Typography from "@mui/material/Typography";
import { Grid, Container, Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import moment from "moment";
import { useItems } from "./PostState";
import parse from 'html-react-parser';


async function fetchPosts() {
  const res = await fetch("https://bold-breeze-2695.fly.dev/getFirstPosts");
  return await res.json();
}

function Post(post, setItems, items) {
  const removePost = async () => {
    fetch("https://bold-breeze-2695.fly.dev/delete", {
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

  return (
    <div key={post.id}>
      <Box pt={10} style={{ whiteSpace: "pre-wrap" }}>
        <Container>
          <Container>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item xs={6}>
                <Typography
                  component="h2"
                  variant="h5"
                  color="textPrimary"
                  gutterBottom
                >
                  {post.topic}
                </Typography>
              </Grid>
              <Grid item xs align="right">
                <IconButton
                  onClick={() => {
                    removePost();
                  }}
                >
                  <RemoveIcon fontSize="10pt" />
                </IconButton>
              </Grid>
            </Grid>
          </Container>
          <Grid container>
            <Grid xs>
              </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                {moment(post.date).format("YYYY-MM-DD").toString()}
              </Typography>
              {parse(post.body)}
            </Grid>
            <Grid xs>
              </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

function PostComponent() {
  const [items, setItems] = useItems();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchPosts().then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, [setItems]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <Grid>{items.map((post) => Post(post, setItems, items))}</Grid>
      </Container>
    );
  }
}

export default PostComponent;
