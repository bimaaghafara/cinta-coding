import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  Slide,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { sx } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (username) {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
          // handle success
          const isUsernameExist = response.data.map(e => e.username.toLowerCase()).includes(username.toLowerCase());
          if (isUsernameExist) {
            console.log('Username is Exist')
          } else {
            console.log('Username is not Exist')
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }

  const renderLoginForm = () => (
    <Box sx={sx.loginFormContainer}>
      <Typography sx={sx.formTitle}>Login Page</Typography>
      <Box sx={sx.field}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="outlined" />
      </Box>
      <Box sx={sx.field}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Password"
          variant="outlined" />
      </Box>
      <Button
        variant="contained"
        sx={sx.loginButton}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  )

  return (
    <Box sx={sx.root}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={sx.cintaCoding}>Cinta Coding</Typography>
        <Button variant="contained" sx={sx.loginModalButton} onClick={handleOpen}>Login</Button>
      </Stack>
      <Box sx={sx.person} component="img" src="/person.png" alt="person" />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={sx.closeButton}
        >
          <CloseIcon />
        </IconButton>
        {renderLoginForm()}
      </Dialog>
    </Box>
  )
}