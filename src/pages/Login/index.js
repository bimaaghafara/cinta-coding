import { Box, Typography, Stack, Button } from '@mui/material';
import { sx } from './styles';

export default function Login() {
  return (
    <Box sx={sx.root}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={sx.cintaCoding}>Cinta Coding</Typography>
        <Button variant="contained" sx={sx.loginButton}>Login</Button>
      </Stack>
      <Box sx={sx.person} component="img" src="/person.png" alt="person" />
    </Box>
  )
}