import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid, Container } from "@mui/material";
import BlogComponent from "./blog";


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
      </Grid>
    </div>
  );
}

export default App;
