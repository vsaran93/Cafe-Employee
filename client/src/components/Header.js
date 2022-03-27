import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@mui/styles';
import Link from "@mui/material/Link"

const useStyles = makeStyles({
  navList: {
    display: 'flex',
    flexDirection: 'row'
  },
  link: {
    margin: '5px !important',
    color: '#fff !important',
  }
});

const pages = [
  {
    name: 'Cafe',
    path: '/'
  },
  {
    name: 'Employee',
    path: '/employee'
  },
];

export default function ButtonAppBar() {
  const styles = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <List 
              className={styles.navList} 
              component="nav" 
              aria-label="secondary mailbox folder"
            >
              {pages.map((page, index) => (
                <ListItem disablePadding key={index}>
                  <Link className={styles.link} href={page.path} underline="none">{page.name}</Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};