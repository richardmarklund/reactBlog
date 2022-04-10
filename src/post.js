import Typography from "@mui/material/Typography";
import { Grid, Container, Box, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { removePost, publishPost } from "./blogApi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PublishButton = (props) => {

    return <IconButton
      onClick={() => {
        publishPost(props.post);
      }}
      disabled = {props.post.isPublished?true:false}
    >
      <PublishIcon fontSize="10pt" />
    </IconButton>
};

const RemoveButton = (props) => {
    return (
      <IconButton
        onClick={() => {
          removePost(props.post, props.setItems);
        }}
        disabled = {props.post.isDeleted?true:false}
      >
        <RemoveIcon fontSize="10pt" />
      </IconButton>
    );
};

const AddButtons = (props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  if (cookies.token) {
    return (
      <Container>
        <IconButton
          onClick={() => {
            navigate("/addPost", { state: props.post });
          }}
        >
          <EditIcon fontSize="10pt" />
        </IconButton>
        <RemoveButton post={props.post} setItems={props.setItems} />
        <PublishButton post={props.post} />
      </Container>
    );
  }
  return null;
};

export function Post(post, setItems, cookies) {
  if (post.isPublished || cookies.token) {
    return (
      <div key={post.id}>
        <Box pt={10}>
          <Container>
            <Grid container>
              <Grid item xs />
              <Grid item xs={8} align="center">
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
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  children={post.body}
                />
              </Typography>
            </Grid>
            <Grid item xs />
          </Container>
        </Box>
      </div>
    );
  } else {
    return null;
  }
}
