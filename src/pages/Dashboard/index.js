import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [comments, setComments] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const count = 10;
  const firstSliceIndex = (page - 1) * count;
  const lastSliceIndex = firstSliceIndex + count;

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      setPosts(res.data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  React.useEffect(() => {
    if (page && posts?.length) {
      const commentsPromises = [];
      for(let i = firstSliceIndex; i < lastSliceIndex; i++) {
        commentsPromises.push(
          axios.get(`https://jsonplaceholder.typicode.com/posts/${posts[i].id}/comments`)
        );
      }
      Promise.all(commentsPromises).then((values) => {
        setComments(values.map(e => e.data.length));
      }).catch(error => {
        console.log(error);
      });

      const usersPromises = [];
      for(let i = firstSliceIndex; i < lastSliceIndex; i++) {
        usersPromises.push(
          axios.get(`https://jsonplaceholder.typicode.com/users/${posts[i].userId}`)
        );
      }
      Promise.all(usersPromises).then((values) => {
        setUsers(values.map(e => e.data));
      }).catch(error => {
        console.log(error);
      });
    }
  }, [firstSliceIndex, lastSliceIndex, page, posts]);

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
        {posts.slice(firstSliceIndex, lastSliceIndex).map((post, i) => (
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
                    {comments[i]}
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
          count={Math.ceil(posts.length / count)}
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