import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import Post from "./post";
import moment from "moment";


let blogContent = [{
  date: moment().format("yyyy-MM-DD"),
  title: "test Title",
  content: "wtf content"
},
{
  date: moment().format("yyyy-MM-DD"),
  title: "test Title 2",
  content: "wtf content 2"
}]

function App() {
  return (
    <div>
      <CssBaseline />
      <Grid container item justify="center" align="center">
        <Container>
          <Typography variant="h1" justify="center">
            Blog
          </Typography>
        </Container>
        <Container>
          <Typography variant="overline">
            The personal blog of Richard Marklund
          </Typography>
        </Container>
        <Container>
          <Typography variant="overline">
          <Grid>{ blogContent.map(post =>  Post(post))}</Grid>
          </Typography>
        </Container>
      </Grid>
    </div>
  );
}

export default App;
