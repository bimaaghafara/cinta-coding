import React from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// components & styles
import PageLayout from "../../components/PageLayout";
import { Box, OutlinedInput, Pagination, PaginationItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { sx } from './styles';

export default function Dashboard() {
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
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

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

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
        {posts.slice(firstSliceIndex, lastSliceIndex).map(post => (
          <Box key={post.id}>{post.id} {post.title}</Box>
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