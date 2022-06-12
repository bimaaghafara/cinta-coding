import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// services
import { usePostQuery, useCommentsQuery, useUserQuery } from './services';

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
  const toggleShowComments = () => setShowComments(!showComments);

  const { data: postData } = usePostQuery(postId, {
    enabled: !!postId,
    onError: (error) => console.log(error)
  });
  const post = postData?.data || [];

  const { data: commentsData } = useCommentsQuery(postId, {
    enabled: !!postId,
    onError: (error) => console.log(error)
  });
  const comments = commentsData?.data || [];

  const { data: userData } = useUserQuery(post?.userId, {
    enabled: !!post?.userId,
    onError: (error) => console.log(error)
  });
  const user = userData?.data || [];

  return (
    <PageLayout title="Post">
      <Box sx={sx.root}>
        <KeyboardBackspaceIcon
          onClick={() => navigate(-1)}
          sx={sx.back}
        />
        <Box key={post?.id} sx={sx.postContainer}>
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