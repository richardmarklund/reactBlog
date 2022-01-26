import Typography from "@mui/material/Typography";
import { Grid, Container, Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";


function Post(post) {
  return(
    <Box pt={3} style={{ whiteSpace: "pre-wrap" }}>
      <Divider ligtht="true" variant="middle" />
      <Box pt={3}>
        <Container>
          <Typography component="h2" variant="h5">
            {post.topic}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.date.toString()}
          </Typography>
          <Typography>{post.body}</Typography>
        </Container>
      </Box>
    </Box>
  )
}
function PostComponent(props) {
  const items = props.items;
  let setItems = props.setItems;
   
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
     fetch("https://bold-breeze-2695.fly.dev/allposts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
    },[setItems]
  );
   
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
          <Grid>
            {items.map((post) => Post(post))}
          </Grid>
      </Container>
    )
  };
}

export default PostComponent;
