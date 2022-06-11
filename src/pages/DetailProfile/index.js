import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// components & styles
import { Box, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PageLayout from "../../components/PageLayout";
import { sx } from './styles';

export default function DetailProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState();
  React.useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('user') || null);
    if (userLogin?.id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${userLogin.id}`)
      .then(function (response) {
        setUserInfo(response.data);
      }).catch(function (error) {
        console.log(error)
      })
    }
  }, []);

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
          <Typography sx={sx.value}>{userInfo?.username}</Typography>
        </Box>
        <Box>
          <Typography sx={sx.label}>Email</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>{userInfo?.email}</Typography>
        </Box>
        <Box>
          <Typography sx={sx.label}>Address</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>
            {[
              userInfo?.address?.suite,
              userInfo?.address?.street,
              userInfo?.address?.city
            ].join(', ')}
          </Typography>
        </Box>
        <Box>
          <Typography sx={sx.label}>Phone</Typography>
          <Typography sx={sx.separator}>:</Typography>
          <Typography sx={sx.value}>{userInfo?.phone}</Typography>
        </Box>
      </Box>
    </PageLayout>
  )
}