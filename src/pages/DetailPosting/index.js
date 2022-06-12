import React from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// components & styles
import PageLayout from "../../components/PageLayout";
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { sx } from './styles';

export default function DetailPosting() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showComments, setShowComments] = React.useState(
    searchParams.get('showComments') === 'true'
  );
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [user, setUser] = React.useState({});

  const toggleShowComments = () => setShowComments(!showComments);

  React.useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => {
      setPost(res.data);
    }).catch(error => {
      console.log(error);
    });
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => {
      setComments(res.data);
      console.log(res.data);
    }).catch(error => {
      console.log(error);
    });
  }, [postId])

  React.useEffect(() => {
    if(post?.userId) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => {
        setUser(res.data)
      }).catch(error => {
        console.log(error);
      });
    }
  }, [post])

  return (
    <PageLayout title="Post">
      <Box sx={sx.root}>
        <KeyboardBackspaceIcon
          onClick={() => navigate(-1)}
          sx={sx.back}
        />
        <Box key={post.id} sx={sx.postContainer}>
          <Grid container spacing={2}>
            <Grid item xs={5} sm={3} />
            <Grid item xs={7} sm={9}>
              <Typography sx={sx.title}>{post?.title}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5} sm={3}>
              <Typography sx={sx.name}>{user?.name}</Typography>
            </Grid>
            <Grid item xs={7} sm={9}>
              <Typography sx={sx.body}>{post?.body}</Typography>
              <Box
                onClick={toggleShowComments}
                sx={[showComments && sx.hidden, sx.commentIconContainer]}
              >
                <ChatBubbleOutlineIcon sx={sx.commentIcon} />
                <Typography sx={sx.comment}>
                  {comments.length}
                </Typography>
              </Box>
              <Box sx={[!showComments && sx.hidden, sx.commentsContainer]}>
                <Typography
                  onClick={toggleShowComments}
                  sx={sx.allComments}
                >
                  All comments
                </Typography>
                {comments.map(comment => (
                  <Grid key={comment.id} container spacing={2} sx={sx.commentContainer}>
                    <Grid item xs={5} sm={3}>
                      <Typography sx={sx.commentName}>{comment.name}</Typography>
                    </Grid>
                    <Grid item xs={7} sm={9}>
                      <Typography sx={sx.commentBody}>{comment.body}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageLayout>
  )
}