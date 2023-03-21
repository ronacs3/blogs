import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setToken, unsetToken } from 'lib/auth.js';
import { useState } from 'react';
import { useUser } from 'lib/authContext';
import { fetcher } from 'lib/api';
import { useRouter } from 'next/router';
const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    phone:'',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetcher(
        `https://v2.wuys.me/api/auth/local/register`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            username: userData.username,
            phone:userData.phone,
          }),
          method: 'POST',
        }
      );
      setToken(responseData);
      router.redirect('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              type="text"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="string"
              id="phone"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
