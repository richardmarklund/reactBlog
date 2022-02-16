import Typography from "@mui/material/Typography";
import { Grid, Container, Box, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import moment from "moment";
import {useItems} from './PostState';


function Post(post) {
  const [items, setItems] = useItems();

  const removePost = async () => {

    fetch("http://localhost:3002/delete", {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
       },
      body:  JSON.stringify({id: post.id}) ,
    }).then(data => {
      if (data.ok) {
        setItems(items.filter((item) => item.id !== post.id));
      }
    });
  }
  
  return (
    <Box pt={3} style={{ whiteSpace: "pre-wrap" }}>
      <Divider ligtht="true" variant="middle" />
      <Box pt={3}>
        <Container>
          <IconButton
            onClick={() => {
              removePost();
            }}
          >
            <RemoveIcon fontSize="10pt" />
          </IconButton>
        </Container>
        <Container>
          <Typography component="h2" variant="h5">
            {post.topic}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {moment(post.date).format("YYYY-MM-DD").toString()}
          </Typography>
          <Typography>{post.body}</Typography>
        </Container>
      </Box>
    </Box>
  );
}


function PostComponent() {
  const [items, setItems] = useItems();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://bold-breeze-2695.fly.dev/getFirstPosts")
      .then((res) => res.json())
      .then(
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
        <Grid>{items.map((post) => Post(post))}</Grid>
      </Container>
    );
  }
}

export default PostComponent;
