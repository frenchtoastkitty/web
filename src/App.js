import React from 'react';
import constants from './constants.js';
import GeoDemo from './GeoDemo';
import Modal from 'react-modal';
import Game from './Game';
import './App.css';
import getWeb3 from './getWeb3';

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

  componentDidMount = async () => {
    const script = document.createElement("script");
    script.src = "https://app.tor.us/embed.min.js";
    script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
    this.setState({web3: await getWeb3()});

    /*
      check to make sure if person is logged into torus
    */
  }

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
        this.setState({playerHasInfo: true})
        console.log(json)
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
