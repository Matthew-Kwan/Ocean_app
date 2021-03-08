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
// import usersList from '../App.js'

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});
// sessionId: 1,
// userId: 1,
// goalId: 2,
// title: "Work on ocean component",
// startTime: new Date(2021,2,1,8,0,0),
// endTime: new Date(2021,2,1,12,0,0),


export default function AdminSessionsTable({sessions}) {
  const classes = useStyles();
  console.log(sessions)
  return (
    <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          All Sessions
        </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Session Title</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Goal ID</TableCell>
            {/* <TableCell align="right">Start Time</TableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((row) => (
            <TableRow key={row.sessionId}>
              
              <TableCell component="th" scope="row">
               {row.title}
              </TableCell>
              <TableCell align="right">{row.sessionId}</TableCell>
              <TableCell align="right">{row.userId}</TableCell>
              <TableCell align="right">{row.goalId}</TableCell>
              {/* <TableCell align="right">{row.startTime}</TableCell> */}



            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
