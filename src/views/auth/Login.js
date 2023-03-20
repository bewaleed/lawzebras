import React,{ useState } from 'react';
import Services from '../../services';
import Keys from '../../constant/keys';
import SnackbarComponent from '../components/SnackbarComponent';
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from "../../assets/img/logo.png";
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:"#29abe1",
    height:"50px"
  },
  Title: {
    marginBottom:"0px",
    paddingBottom: "0px"
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openAlert, setopenAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const getStateData = (data) => {
    setopenAlert(data)
  }
  const handleCloseDialog = (data) => {
    setopenAlert(data);
  };
  const submitForm = () => {
    setLoader(true)
    Services.admin.login(email,password).then(response => {
      localStorage.setItem(Keys.Preference.ACCESS_TOKEN, response.data.data.token)
      localStorage.setItem(Keys.Preference.USER, JSON.stringify(response.data.data))
      setMessage(response.data.message);
      setopenAlert(true);
      setTimeout(() => {
        history.push('/admin');
      }, 500);
    }).catch((error) => {
      const { response } = error
      response?
      setMessage(
        typeof response.data.message === 'string' ? response.data.message :
        message.map((item)=>{
          return(
            item.email? item.email:null + " " + 
            item.password? " password "+ 
            item.password:null
          )
        })
      )
      :setMessage("An error occured")
      setopenAlert(true);
    }).finally(() => {
      setLoader(false)
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box className={classes.avatar}>
          <img src={logo} />
        </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{
                style: {
                  height: "50px",
                  padding: '0 14px',
                  fontSize:"14px"
                },
            }}
            InputLabelProps={{style: {fontSize: 14}}}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={((e)=>setEmail(e.target.value))}
            autoFocus />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{
                style: {
                  height: "50px",
                  padding: '0 14px',
                  fontSize:"14px"
                },
            }}
            InputLabelProps={{style: {fontSize: 14}}}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={((e)=>setPassword(e.target.value))}
          />
          {!loader?
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Sign In
          </Button>
          :
            <Box justifyContent="center" my={3}
              display="flex" alignItems="center">
              <CircularProgress style={{color:"#29abe1"}} />
            </Box>
          }
          <Grid container>
            <Grid item xs align="right">
              <Link  onClick={handleClickOpen} to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <SnackbarComponent message={message} visible={openAlert} getStateData={getStateData} />
      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.Title} id="form-dialog-title">Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontSize:"14px"}}>
            Enter OTP code to reset your password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mobile-otp"
            label="Verfication Code"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
            <Button onClick={handleCloseDialog} color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
