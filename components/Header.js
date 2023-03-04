import Link from "next/link";
import styles from "@/styles/Header.module.css";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Info } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from "react-instantsearch-dom";
import { useState } from "react";
import WhatshotIcon from '@mui/icons-material/Whatshot';
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.black, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.black, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

export default function Header({}) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    <MenuItem>
      <IconButton
      size="large"
      color="inherit"
      href="/the-loai"
      >
        <CategoryIcon />
      </IconButton>
        <Link href="/the-loai">
          Thể Loại
        </Link>
    </MenuItem>
    <MenuItem>
      <IconButton
      size="large"
      color="inherit"
      href="/hotnews"
      >
        <WhatshotIcon />
      </IconButton>
        <Link href="/hotnews">
          Hot News
        </Link>
    </MenuItem>
    <MenuItem>
        <IconButton
          size="large"
          color="inherit"
          href="/about"
        >
            <Info />
        </IconButton>
        <Link href="/about">
                About
            </Link>
    </MenuItem>
    </Menu>
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
    },
  });

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" theme={theme}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            href="/"
          >
            W News
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/the-loai">Thể Loại</Link> 
            <Link href="/hotnews">Hot News</Link>
            <Link href="/about">About</Link>
          </Stack> */}
          <MenuItem>
            <IconButton
             size="large"
             color="inherit"
             href="/search">
              <SearchIcon/>
            </IconButton>
          </MenuItem>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}