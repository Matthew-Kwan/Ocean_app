import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const reports = [
  {id:1,title:'inappropriate session name',user:'3', reportedBy:'5', resolved:false},
  {id:2,title:'hateful speech',user:'7', reportedBy:'2', resolved:false},

  {id:3,title:'they were not very nice to me',user:'2', reportedBy:'10', resolved:false},

  {id:4,title:'i dont like their username',user:'3', reportedBy:'5', resolved:false},
];

export default function AdminReportsTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Active Reports
        </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Report Title</TableCell>
            <TableCell align="right">Report ID</TableCell>
            <TableCell align="right">Reported By User</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Resolved</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.reportedBy}</TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.resolved ? "Yes" : "No"}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
