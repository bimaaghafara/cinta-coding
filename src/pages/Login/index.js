import React from 'react';
import { useNavigate } from 'react-router-dom';

// services
import { useGetUsers } from './services';

// components & styles
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  Slide,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { sx } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  const navigate = useNavigate();
  const [enabledGetUsers, setEnabledGetUsers] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({});
  const [username, setUsername] = React.useState('');
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = () => {
    if (username) {
      setEnabledGetUsers(true);
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Username is required'
      });
    }
  }

  const handleError = (error) => {
    if (error) {
      console.log(error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Unknown Error!'
      });
    }
  };

  const handleSuccess = (res) => {
    if (res?.data) {
      const user = res.data.find(e => e.username.toLowerCase() === username.toLowerCase());
      if (user) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Login success!'
        });
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          username: user.username
        }));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setEnabledGetUsers(false);
        setSnackbar({
          open: true,
          severity: 'error',
          message: `Username "${username}" is not exist!`
        });
      }
    }
  };

  useGetUsers({
    enabled: enabledGetUsers,
    onSuccess: (res) => handleSuccess(res),
    onError: (error) => handleError(error)
  });

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
        <Snackbar
          open={snackbar?.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar?.severity}>
            {snackbar?.message}
          </Alert>
        </Snackbar>
      </Dialog>
    </Box>
  )
}