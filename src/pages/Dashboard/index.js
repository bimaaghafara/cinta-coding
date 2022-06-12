import React from 'react';
import { useNavigate } from 'react-router-dom';

// services
import { useGetPosts, useGetComments, useGetUsers } from './services';

// components & styles
import PageLayout from "../../components/PageLayout";
import {
  Box,
  OutlinedInput,
  Pagination,
  PaginationItem,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { sx } from './styles';

export default function Dashboard() {
  const navigate = useNavigate();
  const [enabledGetComments, setEnabledGetComments] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const count = 10;
  const firstSliceIndex = (page - 1) * count;
  const lastSliceIndex = firstSliceIndex + count;

  const { data: postsData } = useGetPosts({
    onError: (error) => console.log(error)
  });
  const posts = postsData?.data;

  const commentsData = useGetComments(posts?.slice?.(firstSliceIndex, lastSliceIndex), {
    enabled: enabledGetComments,
    onError: (error) => console.log(error)
  });
  const commentsLength = commentsData.map(e => e?.data?.data?.length);

  const usersData = useGetUsers(posts?.slice?.(firstSliceIndex, lastSliceIndex), {
    enabled: enabledGetComments,
    onError: (error) => console.log(error)
  });
  const users = usersData.map(e => e?.data?.data);

  React.useEffect(() => {
    if (page && posts?.length) {
      setEnabledGetComments(true);
    }
  }, [page, posts]);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const navigateToDetailPosting = (postId, showComments) =>
    navigate(`/detail-posting/${postId}${showComments? '?showComments=true': ''}`)

  return (
    <PageLayout title="Post">
      <Box sx={sx.root}>
        <OutlinedInput
          placeholder="Search"
          fullWidth
          size="small"
          sx={sx.searchInput}
          endAdornment={<SearchIcon />}
        />
        {posts?.slice?.(firstSliceIndex, lastSliceIndex).map((post, i) => (
          <Box key={post.id} sx={sx.postContainer}>
            <Grid container spacing={1}>
              <Grid item xs={5} sm={3}>
                <Typography sx={sx.name}>{users[i]?.name}</Typography>
              </Grid>
              <Grid item xs={7} sm={9}>
                <Typography sx={sx.title}>{post.title}</Typography>
                <Stack direction="row" spacing={1}>
                  <ChatBubbleOutlineIcon
                    onClick={() => navigateToDetailPosting(post.id, true)}
                    sx={sx.commentIcon}
                  />
                  <Typography
                    onClick={() => navigateToDetailPosting(post.id, true)}
                    sx={sx.comment}
                  >
                    {commentsLength[i]}
                  </Typography>
                  <Typography
                    onClick={() => navigateToDetailPosting(post.id)}
                    sx={sx.detailButton}
                  >
                    Detail
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Pagination
          sx={sx.pagination}
          page={page}
          count={Math.ceil((posts || []).length / count)}
          onChange={handleChangePagination}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: () => 'prev', next: () => 'next' }}
              {...item}
            />
          )}
        />
      </Box>
    </PageLayout>
  )
}