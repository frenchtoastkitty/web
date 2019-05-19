import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import constants from './constants.js';
import GeoDemo from './GeoDemo';
import Pin from './Pin';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 38.7577,
        longitude: -122.4376,
        zoom: 8
      },
      marker: {
        latitude: 37.7577,
        longitude: -122.4376
      },
      events: {},
      lat: null,
      lon: null
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://app.tor.us/embed.min.js";
    script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

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
          offsetTop={-20}
          offsetLeft={-30}
          draggable
          className={'thing'}
        >
        <Pin size={20} />
        </Marker>

      </ReactMapGL> 
    );
  }
}

export default App;
