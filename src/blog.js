import { Grid, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useItems } from "./PostState";
import { fetchPosts } from "./blogApi";
import { Post } from "./post";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useCookies } from 'react-cookie';


function AddButton(props) {
  let navigate = useNavigate();
  function onClick() {
    navigate("/addPost");
  }

  if (props.cookies.token) {
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
  const [cookies] = useCookies();

  useEffect(() => {
    fetchPosts(cookies).then(
      (result) => {
        console.log(result)
        setIsLoaded(true);
        setItems(result.data);
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
          <Grid>{items.map((post) => Post(post, setItems, cookies))}</Grid>
        </Container>
        <Container>
          <AddButton cookies={cookies}/>
        </Container>
      </div>
    );
  }
}

export default BlogComponent;
