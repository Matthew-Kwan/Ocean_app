import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getReports } from '../actions/reports';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


// HARDCODED DATA - we would pull the reports from the reports table in our server
// const reports = [
//   {id:1,user:'3', reportedBy:'5', resolved:false},
//   {id:2,user:'7', reportedBy:'2', resolved:false},

//   {id:3,user:'2', reportedBy:'10', resolved:false},

//   {id:4,user:'3', reportedBy:'5', resolved:false},
// ];

export default function AdminResolvedReportsTable() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    getReports(setReports)
  }, [] )
  
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Resolved Reports
          </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Report ID</TableCell>
              <TableCell align="right">Reason</TableCell>
              <TableCell align="right">Reported By User</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Resolved</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((row) => (
              <TableRow key={row.title}>
              
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.reportedBy}</TableCell>
                <TableCell align="right">{row.reportedUser}</TableCell>
                <TableCell align="right">{row.resolved ? "Yes" : "No"}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
