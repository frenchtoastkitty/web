import React from 'react';

import { FTCHAIN_ADDRESS, WEATHERGAME_ADDRESS } from './abis/addresses.js';
import Game from './Game';
import getWeb3 from './getWeb3';
import FTChainLinkContract from "./abis/FTChainLinkContract.json"
import WeatherGame from "./abis/WeatherGame.json"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      kittyID: null,
      kittyData: null,
      playerHasInfo: false,
      inValidKittyFlag: false,
      ftchain: null,
      wgchain: null
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.getWeather = this.getWeather.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
    this.getWoeid= this.getWoeid.bind(this);
    this.addKittyId = this.addKittyId.bind(this);
  }

  ftchaincontract = async () => {
    const { web3 } = this.state;
    const instance = await new web3.eth.contract(
            FTChainLinkContract,
            FTCHAIN_ADDRESS,
          );
    this.setState({ftchain: instance})
  }

  wgcontract = async () => {
    const { web3 } = this.state;
    const instance = new web3.eth.contract(
            WeatherGame,
            WEATHERGAME_ADDRESS,
          );
    this.setState({wgchain: instance})
   }

  addKittyId = async (id) => {
    const { web3 } = this.state;
    var MyContract = web3.eth.contract(WeatherGame);
    // instantiate by address
    var value
    var contractInstance = MyContract.at(WEATHERGAME_ADDRESS);
    contractInstance.addKittyId(id, 0, function(error, result){
     if (!error)
       value = result[0];
       console.log(result)
    });
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
  }

  updateWeather = async (id) => {
    const { web3 } = this.state;

    var FTContract = web3.eth.contract(FTChainLinkContract);
    // instantiate by address
    var dataF
    var ftInstance = FTContract.at(FTCHAIN_ADDRESS);
    ftInstance.data.call(function(error, result){
     if (!error)
       dataF = result[0];
    });

    var MyContract = web3.eth.contract(WeatherGame);
    // instantiate by address
    var value
    var contractInstance = MyContract.at(WEATHERGAME_ADDRESS);
    contractInstance.updateWeather(id, dataF, function(error, result){
     if (!error)
       value = result[0];
       console.log(result)
    });
  }

  getWeather = async (id) => {
    const { web3 } = this.state;
    var MyContract = web3.eth.contract(WeatherGame);
    // instantiate by address
    var value
    var contractInstance = MyContract.at(WEATHERGAME_ADDRESS);
    contractInstance.getWeather.call(id, function(error, result){
     if (!error)
       value = result[0];
       //console.log(result)
    });
    return value
  }

  componentDidMount = async () => {
    // torus injection
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
      await fetch(`https://public.api.cryptokitties.co/v1/kitties?kittyId=${this.state.kittyID}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-token' : 'YwwxK5v49F-A10kiLNZN5Mp-VI5pc-1vHBRljHskN5w'
        }
      }).then(response => {
        return (response.status === 200) ? response.json() : null
      }).then((json) => {
        if (json && json.kitties.length) {
          this.setState({
            playerHasInfo: true,
            kittyData: json.kitties[0],
            inValidKittyFlag: false
          });
          console.log(this.state.kittyData)
        } else {
          this.setState({inValidKittyFlag: true})
        }
      });
    }
  }

  render() {
    const h1Style = {
      fontSize: '36px',
      textAlign: 'center'
    };
    if (this.state.playerHasInfo) {
      return <Game
        web3={this.state.web3}
        kitty={this.state.kittyData}
        ftchain={this.state.ftchain}
        wgchain={this.state.wgchain}
        addKittyId={this.addKittyId}
        updateWeather={this.updateWeather}
        getWeather={this.getWeather}/>;
    } else {
      return (
        <div>
          <h1 style={h1Style}>FRENCH TOAST KITTY</h1>
          <form onSubmit={this.onFormSubmit}>
            <span>Enter Kitty Id to Begin: <input onChange={this.inputOnChange} type="text"/></span>
            <button type="submit">Start</button>
            {this.state.inValidKittyFlag && <p style={{color: 'red'}}>not a valid kitty id</p>}
          </form>
          <p>click the bottom button to login</p>
          {this.state.web3 && this.state.web3.eth.accounts[0] && <p>web3 has loaded</p>}
        </div>
       );
    }
  }
}

export default App;
