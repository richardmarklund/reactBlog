import Typography from "@mui/material/Typography";
import { Container, Box, Divider } from "@mui/material";

function Post(props) {
  const post = props;

  return (
      <Box pt={3} style={{ whiteSpace: 'pre-wrap' }}>
      <Divider ligtht="true" variant="middle" />
      <Box pt={3}>
        <Container>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.date.toString()}
          </Typography>
          <Typography>
            {post.content}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Post;
