import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { useSpring, animated } from 'react-spring';
import { geolocated } from 'react-geolocated';
import './App.css';
const constants = require('./constants.js')

function Pin() {
  let radian = .10 * Math.PI
  const { radians } = useSpring({
    to: async next => {
      while (true) {
        await next({ radians: radian })
        radian = -radian
      }
    },
    from: { radians: radian },
    config: { duration: 200 },
    reset: false,
  })
  return (
    <animated.img 
      src={constants.kitty_image}
      style={{
        width: 200, height: 200,
        transform: radians.interpolate(r => `rotateZ(${r}rad)`)
      }} 
    />
  );
}

class Demo extends React.Component {
  render() {
    if (!this.props.isGeolocationAvailable) {
       return <div>Your browser does not support Geolocation</div>;
    }
    else if (!this.props.isGeolocationEnabled) {
      return <div>Geolocation is not enabled</div>
    }
    else if (this.props.coords) {
      return <div>{this.props.coords} coords</div>
    } else {
      return <div>bad</div>
    }
  }
}

const GeoDemo = geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);

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
          {/* <Pin size={20} /> */}
        </Marker>

      </ReactMapGL> 
    );
  }
}

export default App;
