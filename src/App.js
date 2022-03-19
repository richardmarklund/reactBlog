import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Container, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogComponent from "./blog";

function AddButton() {
  let navigate = useNavigate();
  function onClick() {
    navigate("/addPost");
  }

  return (
    <IconButton onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

function App() {
  return (
    <div>
      <CssBaseline />
      <Grid container direction="column" justifyContent="center" align="center">
        <Container>
          <Typography variant="h1">Blog</Typography>
        </Container>
        <Container>
          <Typography variant="overline">
            The personal blog of Richard Marklund
          </Typography>
        </Container>
          <BlogComponent />
          <Container>
            <AddButton />
          </Container>
      </Grid>
    </div>
  );
}

export default App;
