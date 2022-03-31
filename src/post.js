import Typography from "@mui/material/Typography";
import { Grid, Container, Box, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useAuth } from "./authState"
import { removePost } from "./blogApi";

function RemovePost(props) {
  const [auth] = useAuth();
  if (auth.authenticated) {
    return (
      <IconButton
        onClick={() => {
          removePost(props.post, props.setItems);
        }}
      >
        <RemoveIcon fontSize="10pt" />
      </IconButton>
    );
  }
  return null;
}

export function Post(post, setItems) {
  return (
    <div key={post.id}>
      <Box pt={10} style={{ whiteSpace: "pre-wrap" }}>
        <Container>
          <Grid container>
            <Grid item xs />
            <Grid item xs={8}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                paragraph
                sx={{ m: 0, p: 1 }}
              >
                {moment(post.date).format("YYYY-MM-DD").toString()}
              </Typography>
            </Grid>
            <Grid item xs>
              <RemovePost post={post} setItems={setItems} />
            </Grid>
          </Grid>
          <Grid item>
            <Typography component={"span"} align="left">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} children={post.body} />
            </Typography>
          </Grid>
          <Grid item xs />
        </Container>
      </Box>
    </div>
  );
}
