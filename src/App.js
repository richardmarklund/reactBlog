import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PostComponent from "./post";
import { useState } from "react";


function App() {
  const [items, setItems] = useState([]);

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
        <PostComponent items={items} setItems={setItems} />
        <Container>
          <IconButton component={Link} to="/addPost" state= {{items} }>
            <AddIcon />
          </IconButton>
        </Container>
      </Grid>
    </div>
  );
}

export default App;
