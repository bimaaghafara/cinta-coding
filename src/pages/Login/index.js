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
import { sx } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderLoginForm = () => (
    <Box sx={sx.loginFormContainer}>
      <Typography sx={sx.formTitle}>Login Page</Typography>
      <Box sx={sx.field}>
        <TextField label="Username" variant="outlined" />
      </Box>
      <Box sx={sx.field}>
        <TextField label="Password" variant="outlined" />
      </Box>
      <Button variant="contained" sx={sx.loginButton} onClick={() => {}}>Login</Button>
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