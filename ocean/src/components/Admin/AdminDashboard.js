import './admin.css'
import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminActiveReportsTable from './AdminActiveReportsTable';
import AdminResolvedReportsTable from './AdminResolvedReportsTable';
import AdminUsersTable from './AdminUsersTable';
import AdminSessionsTable from './AdminSessionsTable'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function AdminDashboard({users, sessions, setUsers}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    <div className={classes.root}>
      <div className='column'></div>
      <Tabs id="adminNav"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}>
        <Tab label="Sessions" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
        <Tab label="Active Reports" {...a11yProps(2)} />
        {/* <Tab label="Resolved Reports" {...a11yProps(2)} /> */}

       
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <AdminSessionsTable sessions = {sessions}></AdminSessionsTable>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminUsersTable users = {users} setUsers = {setUsers}></AdminUsersTable>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminActiveReportsTable setUsers = {setUsers}></AdminActiveReportsTable>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <AdminResolvedReportsTable></AdminResolvedReportsTable>
      </TabPanel> */}
      
    </div>
  );
}