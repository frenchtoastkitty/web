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
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {

    return (<button>test</button>);
//    if (this.state.web3 && this.state.web3.eth.accounts[0]) {
//      return (
//          <button onClick={this.openModal}>Open Modal</button>
//          <Modal
//            isOpen={this.state.modalIsOpen}
//            onAfterOpen={this.afterOpenModal}
//            onRequestClose={this.closeModal}
//            style={customStyles}
//            contentLabel="Example Modal">
//
//            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
//            <button onClick={this.closeModal}>close</button>
//            <div>I am a modal</div>
//            <form>
//              <input />
//              <button>tab navigation</button>
//              <button>stays</button>
//              <button>inside</button>
//              <button>the modal</button>
//            </form>
//          </Modal>
//      );
//    }
//  }
  }
}

export default App;
