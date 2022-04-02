import Typography from "@mui/material/Typography";
import { Grid, Container, Box, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { removePost } from "./blogApi";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';



const AddButtons = (props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  if (cookies.token) {
    return (
      <Container>
        <IconButton
          onClick={() => {
            removePost(props.post, props.setItems);
          }}
        >
          <RemoveIcon fontSize="10pt" />
        </IconButton>
        <IconButton
          onClick={() => {
            navigate('/addPost', {state: props.post})
          }}
        >
          <EditIcon fontSize="10pt" />
        </IconButton>
      </Container>
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
              <AddButtons post={post} setItems={setItems} />
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
