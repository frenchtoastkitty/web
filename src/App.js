import React from 'react';
import constants from './constants.js';
import { FTCHAIN_ADDRESS, WEATHERGAME_ADDRESS } from './abis/addresses.js';
import GeoDemo from './GeoDemo';
import Modal from 'react-modal';
import Game from './Game';
import './App.css';
import getWeb3 from './getWeb3';
import FTChainLinkContract from "./abis/FTChainLinkContract.json"
import WeatherGame from "./abis/WeatherGame.json"


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: constants.defaultLat,
        longitude: constants.defaultLong,
        zoom: 15
      },
      marker: {
        latitude: constants.defaultLat,
        longitude: constants.defaultLong
      },
      events: {},
      lat: null,
      lon: null,
      modalIsOpen: false,
      kittyID: null,
      kittyData: null,
      playerHasInfo: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  ftchaincontract = async () => {
    const { web3 } = this.state;
    const instance = await new web3.eth.contract(
            FTChainLinkContract,
            FTCHAIN_ADDRESS,
          );
    this.setState({ftchain: instance})
  }

  getWoeid = async () => {
    const { web3 } = this.state;
    var MyContract = web3.eth.contract(WeatherGame);
    // instantiate by address
    var value
    var contractInstance = MyContract.at(WEATHERGAME_ADDRESS);
    contractInstance.woeid.call(function(error, result){
     if (!error)
       value = result[0];
    });
    return value
  }

  getWeather = async (id) => {
    const { web3 } = this.state;
    var MyContract = web3.eth.contract(WeatherGame);
    // instantiate by address
    var value
    var contractInstance = MyContract.at(WEATHERGAME_ADDRESS);
    contractInstance.getWeather(id).call(function(error, result){
     if (!error)
       value = result[0];
    });
    return value
  }

  wgcontract = () => {
    const { web3 } = this.state;
    const instance = new web3.eth.contract(
            WeatherGame,
            WEATHERGAME_ADDRESS,
          );
    this.setState({wgchain: instance})
   }

  componentDidMount = async () => {
    const script = document.createElement("script");
    script.src = "https://app.tor.us/embed.min.js";
    script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
    this.setState({web3: await getWeb3() });
    await this.ftchaincontract()
    await this.wgcontract()
    this.getWoeid()
  }
    /*
      check to make sure if person is logged into torus
    */

  inputOnChange(e) {
    this.setState({kittyID: e.target.value});
  }

  onFormSubmit = async(e) => {
    e.preventDefault();
    if (this.state.web3 && this.state.web3.eth.accounts[0] && this.state.kittyID) {
      await fetch('https://public.api.cryptokitties.co/v1/kitties?kittyId=23546', {
        headers: {
            'Content-Type': 'application/json',
            'x-api-token' : 'YwwxK5v49F-A10kiLNZN5Mp-VI5pc-1vHBRljHskN5w'
        }
      }).then(response => response.json()).then((json) => {
        this.setState({playerHasInfo: true, kittyData: json.kitties[0]})
        console.log(this.state.kittyData)
      });
    }
  }

  render() {
    //conditional that shows login here, title, kitty id
    if(this.state.playerHasInfo) {
      
      return <button>load game here</button>;
    } else {
      return (
        <div>
          <h1>FRENCH TOAST KITTY</h1>
          <form onSubmit={this.onFormSubmit}>
            <span>Kitty Id: <input onChange={this.inputOnChange} type="text"/></span>
            <button type="submit">Start</button>
          </form>
          <p>click the bottom button to login</p>
          {this.state.web3 && this.state.web3.eth.accounts[0] && <p>web3 has loaded</p>}
        </div>
       );
    }
  }
}

export default App;
