import './App.css'
import React from 'react'
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ethers } from 'ethers'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom'

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL,
} from './constants'
import { makeStyles } from '@material-ui/core/styles';

const NETWORK = 'goerli'

// firebase.initializeApp({
//   apiKey: "AIzaSyCQ2qGex8_rpeBoFXaKbrgiACFJA9F8Kc8",
//   projectId: "check-out-form",
//   authDomain: "check-out-form.firebaseapp.com",
// })
 
// let db = firebase.firestore();
// console.log('firebase: ', firebase)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <AppBody />
        </div>
      </div>
    </BrowserRouter>
  )
}

function AppBody() {
  const classes = useStyles();
  const [savedUsername, setSavedUsername] = React.useState(
    window.localStorage.getItem('userName') || '',
  )

  React.useEffect(() => {
    if (savedUsername) {
      window.localStorage.setItem('userName', savedUsername)
    } else {
      window.localStorage.removeItem('userName')
    }
  }, [savedUsername])

  return (
    <Switch>
      <Route
        path='/'
        render={() => (
          <LoginPage 
            savedUsername={savedUsername}
            setSavedUsername={setSavedUsername}
            classes={classes} 
            isLoggedIn={Boolean(savedUsername)}     
          />
        )}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/voting/1'
        exact={true}
        render={() => <Part1Page />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/voting/2'
        exact={true}
        render={() => <Part2Page 
          
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/voting/3'
        exact={true}
        render={() => <Part3Page 
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/voting/summary'
        exact={true}
        render={() => <SummaryPage 
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/results'
        exact={true}
        render={() => <ResultPage 
        />}
      />
    </Switch>
  )
}  

function LoginPage({savedUsername, setSavedUsername, classes, isLoggedIn}) {
  const [userName, setUserName] = React.useState(
    window.localStorage.getItem('userName') || '',
  )

  const onChangeName = event =>{
    setUserName(event.target.value)
  }
  const toPart1 = () => {
    setSavedUsername(userName)
  }

  return (
    <div>
      {savedUsername?
        <Redirect to='/voting/1' />  
        :
        <Grid container={true} justify='space-between'>
          <Typography component='h1' gutterBottom={true}>
            Cast Your Vote
          </Typography>
          <Typography variant='h5' component='h1' align='left'>
            To begin your voting application, choose a username:
          </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid item xs={12} lg={6}>
                <TextField  value={userName} onChange={onChangeName}  id="standard-basic" label="Name" />

                <Grid style={{ marginTop: 10 }} container spacing={1}>
                  <Grid item xs={6}>
                    <Button 
                      variant='outlined' 
                      onClick={toPart1}
                      disabled={userName === ''}
                    >CONTINUE</Button>
                  </Grid>
                </Grid>
              </Grid>
            
            </form>

            <Link to='/' component={RouterLink}>
              Back to start
            </Link>
        </Grid>
      }
      
    </div>
  )
}

function Part1Page() {
  console.log('part1')
  return ((<div>
    <Typography>Homepage</Typography>
    <Button variant='contained' color='primary'>
      Authorize me!
    </Button>
  </div>))
}

function Part2Page() {
  return <div>Part2Page</div>
}
function Part3Page() {
  return <div>Part3Page</div>
}
function SummaryPage() {
  return <div>SummaryPage</div>
}
function ResultPage() {
  return <div>ResultPage</div>
}

const withLoggedInState = Component => {
  consolg.log('here we are !')
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to='/voting/1' />}
        <Component {...props} />
      </div>
    )
  }
}

const LoggedInRoute = withLoggedInState(Route)
