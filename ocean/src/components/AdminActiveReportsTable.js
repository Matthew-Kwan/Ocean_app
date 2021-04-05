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
import { getReports, deleteReport, markReviewed, addReport } from '../actions/reports';
// import { deleteUsers} from '../actions/users';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function AdminActiveReportsTable() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    getReports(setReports)
  }, [] )
  
  const classes = useStyles();

  const deleteUser = (report) => {
    
    console.log('deleting User')
    console.log('and then dismissing Report')
    // TODO: ADD DELETE USER HERE
    deleteReport(report._id)
    getReports(setReports)

  }

  const dismissReport = (report) => {
    console.log(report)
    
    console.log('dismissing Report')
    console.log(report)
    deleteReport(report._id)
    getReports(setReports)

  }
  
  return (
      <TableContainer component={Paper}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Active Reports
          </Typography>
        <Table className={classes.table} aria-label="simple table">


          
          <TableHead>
            <TableRow>
              <TableCell align="right">Report ID</TableCell>
              <TableCell align="right">Reason</TableCell>
              <TableCell align="right">Reported By User</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Resolved</TableCell>
              <TableCell align="right">Ban User</TableCell>
              <TableCell align="right">Dismiss</TableCell>
              

            </TableRow>
          </TableHead>
          <TableBody>
            {reports.filter(report => report.resolved == false).map((row) => (
              <TableRow key={row._id}>
              
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.reportedBy}</TableCell>
                <TableCell align="right">{row.reportedUser}</TableCell>
                <TableCell align="right">{row.resolved ? "Yes" : "No"}</TableCell>
                <TableCell align="right"><button onClick={() => deleteUser(row)}>Ban</button></TableCell>
                <TableCell align="right"><button  onClick={() => dismissReport(row)}>Dismiss</button></TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
