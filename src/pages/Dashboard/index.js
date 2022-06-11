// components & styles
import PageLayout from "../../components/PageLayout";
import { Box, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { sx } from './styles';

export default function Dashboard() {
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
        <Box fullWidth>Dashboard Page</Box>
      </Box>
    </PageLayout>
  )
}