import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import constants from './constants.js';
import GeoDemo from './GeoDemo';
import Pin from './Pin';
import './App.css';
import getWeb3 from './getWeb3';

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
      lon: null
    };
  }

  componentDidMount = async () => {
    const script = document.createElement("script");
    script.src = "https://app.tor.us/embed.min.js";
    script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
    this.setState({web3: await getWeb3()});
  }

  render() {
    const {viewport, marker} = this.state;

    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={constants.MAPBOX_TOKEN}
      >

        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-100}
          offsetLeft={-100}
          draggable
          className={'thing'}
        >
        <Pin/>
        </Marker>

      </ReactMapGL> 
    );
  }
}

export default App;
