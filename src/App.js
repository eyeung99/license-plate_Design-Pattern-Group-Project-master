import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import FormControl from '@material-ui/core/FormControl'
import { ethers } from 'ethers'
import Web3 from 'web3'

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useHistory,
} from 'react-router-dom'

import {
  CONTRACT_ADDRESS,
  ABI
} from './constants'
import { makeStyles } from '@material-ui/core/styles';

const NETWORK = 'ropsten'
let web3

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <AppHeader />
          <Box m={4} />
          <AppBody />
        </div>
      </div>
    </BrowserRouter>
  )
}

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Typography component='h1'>License Registration App</Typography>
    </div>
  )
}

function AppBody() {
  const classes = useStyles();
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.web3.setProvider(window.web3.currentProvider);
  }
  const [savedAddress, setSavedAddress] = React.useState(
    window.web3.eth.accounts.givenProvider.selectedAddress
  )

  React.useEffect(() => {
    if (savedAddress !== window.web3.eth.accounts.givenProvider.selectedAddress
      ) {
        console.log('updated!')
        setSavedAddress(window.web3.eth.accounts.givenProvider.selectedAddress)
    }
  }, [savedAddress])

  return (
    <Switch>
      <Route
        path='/'
        exact={true}
        render={() => (
          <LoginPage
            savedAddress={savedAddress}
            setSavedAddress={setSavedAddress}
            classes={classes} 
            isLoggedIn={Boolean(savedAddress)}
          />
        )}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/main'
        exact={true}
        render={() => <MainPage />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/main'
        exact={true}
        render={() => <MainPage />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/register'
        exact={true}
        render={() => <RegisterPage ethAddress={savedAddress}/>}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/search'
        exact={true}
        render={() => <SearchPage
          
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/registerResult'
        exact={true}
        render={() => <RegisterResultPage 
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/searchResult'
        exact={true}
        render={() => <SearchResultPage 
          ethAddress={savedAddress}
        />}
      />

    </Switch>
  )
}

function LoginPage({savedAddress, setSavedAddress, classes, isLoggedIn}) {
  const [ethAddress, setEthAddress] = React.useState(
    window.localStorage.getItem('ethAddress') || '',
  )

  const onChangeAddress = async event => {
    const accounts = await window.ethereum.enable()
    console.log('Accounts found:', accounts)
    setEthAddress(accounts)
  }
  const toPart1 = () => {
    setSavedAddress(ethAddress)
  }

  return (
    <div>
      {savedAddress?
        <Redirect to='/main' />  
        :
        <Grid container={true} justify='space-between'>
          <Typography component='h1' gutterBottom={true}>
            Welcome to our License registration APP!
          </Typography>
          <Typography variant='h5' component='h1' align='left'>
            Please make sure you are connected to an Ethereum Node in Ropsten network
          </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid item xs={12} lg={6}>
                <TextField  value={ethAddress} onChange={onChangeAddress}  id="standard-basic" label="Name" />
                <Grid style={{ marginTop: 10 }} container spacing={1}>
                  <Grid item xs={6}>
                    <Button 
                      variant='outlined' 
                      onClick={toPart1}
                      disabled={ethAddress === ''}
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

function MainPage() {
  const classes = useStyles();
  const history = useHistory()

  function goToSearch() {
    history.push('/search')
  }

  function goToRegister() {
    history.push('/register')
  }

  return (<div>
    <FormControl component="fieldset" className={classes.formControl}>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <Button onClick={goToRegister} variant='outlined'>Register</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={goToSearch} variant='outlined'>Search</Button>
        </Grid>
      </Grid>
    </FormControl>

    
  </div>)
}

function RegisterPage({ethAddress}) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [VIN, setVIN] = React.useState('');
  const [plate, setPlate] = React.useState('');
  const [isValidPlate, setIsValidPLate] = React.useState(false)

  const history = useHistory()

  const handleName = event => {
    setName(event.target.value);
  };
  const handleAddress = event => {
    setAddress(event.target.value);
  };
  const handleVIN = event => {
    setVIN(event.target.value);
  };
  const handlePlate = event => {
    if(event.target.value.match("^[a-zA-Z ]*$") === null ){
      setPlate(event.target.value);
    }
    if (event.target.value.length === 7) {
      setIsValidPLate(true)
    }
    else {
      setIsValidPLate(false)
    }
  };


  async function register() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        let etherProvider = new ethers.providers.Web3Provider(window.web3.currentProvider)    
        // let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        window.web3.setProvider(window.web3.currentProvider);
        let contract = new window.web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
          from: ethAddress,
          gasPrice: await etherProvider.getGasPrice()
        })

        let transactionObject = {
          // nonce: await etherProvider.getTransactionCount(CONTRACT_ADDRESS),
          // gasLimit: 35000,
          gas: 210000,
          // chainId: ethers.utils.getNetwork('ropsten').chainId
        }
        let result = await contract.methods.register(name, address, VIN, plate).send(transactionObject)
        console.log('this is result: ', result)
        history.push('/registerResult')
      } catch (error) {
        console.log('register failed!: ', error)
      }
    }
    
  }

  return (<div>
    <FormControl component="fieldset" className={classes.formControl}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12} lg={6}>
          <TextField  value={name} onChange={handleName}  id="standard-basic" label="Name" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={address} onChange={handleAddress}  id="standard-basic" label="address" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={VIN} onChange={handleVIN}  id="standard-basic" label="VIN" />
          {VIN.length === 17 ? null : <Typography style={{color: 'red'}}>Please input valid VIN number</Typography>}
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={plate} onChange={handlePlate}  id="standard-basic" label="plate" />
          {isValidPlate ? null : <Typography style={{color: 'red'}}>Please input plate number in valid form</Typography>}
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={ethAddress}  id="standard-basic" label="ETH Address" />
        </Grid>
      </form>
      <Grid style={{ marginTop: 10 }} container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={register}
            // disabled={name === '' || address === '' || plate === '' || VIN === '' || VIN.length !== 17 || !isValidPlate}
          >Register</Button>
          <Grid item xs={6}>
            <Button 
              variant='outlined' 
              onClick={() => history.goBack()}
            >Back</Button>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>

    
  </div>)
}

function SearchPage() {
  const history = useHistory()

  const classes = useStyles();
  const [searchKey, setSearchKey] = React.useState('');

  const handleSearchKey = event => {
    setSearchKey(event.target.value);
  };

  function search() {
    // Incomplete search function
    history.push('/searchResult')
  }

  return (<div>
    <FormControl className={classes.formControl}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12} lg={6}>
          <TextField  value={searchKey} onChange={handleSearchKey}  id="standard-basic" label="ETHAddress, VIN or plate#" />
        </Grid>
      </form>
      <Grid style={{ marginTop: 10 }} container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={search}
            disabled={searchKey === ''}
          >Search</Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={() => history.goBack()}
          >Back</Button>
        </Grid>
      </Grid>
    </FormControl>
  </div>)
}
async function RegisterResultPage() {
  const history = useHistory()
  const classes = useStyles();
  let list = [{key: 'test', id: 1, name: 'name', value: 'value'}]
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      let etherProvider = new ethers.providers.Web3Provider(window.web3.currentProvider)    
      // let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      window.web3.setProvider(window.web3.currentProvider);
      let contract = new window.web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
        from: window.web3.eth.accounts.givenProvider.selectedAddress
        ,
        gasPrice: await etherProvider.getGasPrice()
      })
      let result = await contract.methods.getLicenserByETHAddress(window.web3.eth.accounts.givenProvider.selectedAddress).call()
      console.log('this is register result: ', result)
    } catch (error) {
      console.log('register failed!: ', error)
    }
  }


  return (
      <div className={classes.root}>
          <Typography component='h1'>This is your register result </Typography>
          <FormControl className={classes.formControl}>
          {
          list.map(item => (
              <SummaryDetail
                key={item.id}
                name={item.name}
                value={item.value}
              />
          ))
          }

          <Box m={3} />
          <Box m={3} />
          <Button variant='outlined' onClick={() => history.push('/main')}>
            BACK TO HOME
          </Button>
        </FormControl>
      </div>
    
    )
}
function SearchResultPage() {
  const history = useHistory()
  const classes = useStyles();
  let list = [{key: 'test', id: 1, name: 'name', value: 'value'}]
  
      // Incomplete searchResult function


  return (
      <div className={classes.root}>
          <FormControl className={classes.formControl}>
          {
          list.map(item => (
              <SummaryDetail
                key={item.id}
                name={item.name}
                value={item.value}
              />
          ))
          }

          <Box m={3} />
          <Box m={3} />
          <Button variant='outlined' onClick={() => history.push('/main')}>
            BACK TO HOME
          </Button>
        </FormControl>
      </div>
    
    )
}

function SummaryDetail({name, value}) {
  return (
    <Grid>
      <Typography>{name}</Typography>
      <Typography style={{color: '#4d4dff', fontWeight: 'bold'}}>{value}</Typography>
      <Box m={3} />
    </Grid>
    
  )
}
const withLoggedInState = Component => {
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to='/main' />}
        <Component {...props} />
      </div>
    )
  }
}

const LoggedInRoute = withLoggedInState(Route)
