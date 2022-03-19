import { Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useItems } from "./PostState";
import { fetchPosts } from "./blogApi";
import {Post} from "./post"

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
        <Container>
          <Grid>{items.map((post) => Post(post, setItems))}</Grid>
        </Container>
      );
    }
  }
  
  export default BlogComponent;
  