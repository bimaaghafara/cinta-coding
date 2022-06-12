import { useNavigate } from 'react-router-dom';

// components & styles
import ScrollToTop from '../ScrollToTop';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { sx } from './styles';

export default function PageLayout({
  title,
  children
}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || null);

  return (
    <ScrollToTop>
      <Box sx={sx.root}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={sx.cintaCoding}
            onClick={() => navigate('/')}
          >
            Cinta Coding
          </Typography>
          <Typography sx={sx.title}>{title}</Typography>
          <Box>
            <Typography sx={sx.cintaCoding}>Wellcome, </Typography>
            <Typography
              sx={[sx.cintaCoding, sx.name]}
              onClick={() => {
                if (window.location.pathname !== '/detail-profile') navigate('/detail-profile')
              }}
            >
              {user?.name}
            </Typography>
          </Box>
        </Stack>
        {children}
      </Box>
    </ScrollToTop>
  );
}