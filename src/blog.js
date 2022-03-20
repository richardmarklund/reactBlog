import { Grid, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useItems } from "./PostState";
import { useAuth } from "./auth";
import { fetchPosts } from "./blogApi";
import { Post } from "./post";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function AddButton() {
  let navigate = useNavigate();
  function onClick() {
    navigate("/addPost");
  }
  const [auth] = useAuth();

  if (auth.authentiated) {
    return (
      <IconButton onClick={onClick}>
        <AddIcon />
      </IconButton>
    );
  }
  return null
}

function BlogComponent() {
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
      <div>
        <Container>
          <Grid>{items.map((post) => Post(post, setItems))}</Grid>
        </Container>
        <Container>
          <AddButton />
        </Container>
      </div>
    );
  }
}

export default BlogComponent;
