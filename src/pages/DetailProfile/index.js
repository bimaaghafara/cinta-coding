import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// services
import { useUserQuery } from '../DetailPosting/services';

// components & styles
import { Box, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PageLayout from "../../components/PageLayout";
import { sx } from './styles';

export default function DetailProfile() {
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem('user') || null);
  const { data: userData } = useUserQuery(userLogin?.id, {
    enabled: !!userLogin?.id,
    onError: (error) => console.log(error)
  });
  const user = userData?.data || {};

  return (
    <PageLayout title="Profile">
      <Box sx={sx.root}>
        <KeyboardBackspaceIcon
          onClick={() => navigate(-1)}
          sx={sx.back}
        />
        <Box>
          <Typography sx={sx.label}>Username</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>{user?.username}</Typography>
        </Box>
        <Box>
          <Typography sx={sx.label}>Email</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>{user?.email}</Typography>
        </Box>
        <Box>
          <Typography sx={sx.label}>Address</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>
            {[
              user?.address?.suite,
              user?.address?.street,
              user?.address?.city
            ].join(', ')}
          </Typography>
        </Box>
        <Box>
          <Typography sx={sx.label}>Phone</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>{user?.phone}</Typography>
        </Box>
      </Box>
    </PageLayout>
  )
}