import React from 'react'
import './login.css'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Login = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div id='loginbody'>
            <Card id='loginModule' className={classes.root}>
                <CardContent>
                    <h3>
                    Dive into Ocean</h3>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className = 'input'>
                        <TextField required id="outlined-basic" size='small' label="Username" variant="outlined" /></div>
                        <div className= 'input'>
                        <TextField required id="outlined-basic" size='small' label="Password" type="password" variant="outlined" /></div>

                    </form>
                    <Button variant="contained" color="primary">
                        Login
                        </Button>
                </CardContent>
              
                </Card>
          
            
        </div>
    )
}

export default Login;