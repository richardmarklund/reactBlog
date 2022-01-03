import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";




function Post(props) {
  const post  = props;

  return (
    <Container>
      <Typography component="h2" variant="h5">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {post.date.toString()}
      </Typography>
      <Typography variant="subtitle1" paragraph>
        {post.content}
      </Typography>

    </Container>
  );
}

export default Post;
