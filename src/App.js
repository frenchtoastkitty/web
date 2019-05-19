import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { useSpring, animated } from 'react-spring';
import { geolocated } from 'react-geolocated';
import './App.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXJwaWNrbGVzIiwiYSI6ImNqdnR2dDFxczIzNHU0NW8xdWRubTl3YmIifQ.UoIlc1H6oaKCppG0MUDwXQ';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  fill: '#d00',
  stroke: 'none'
};

const kitty_image = 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png';

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
      src={kitty_image}
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

    this.click = this.click.bind(this);
    this.showPosition = this.showPosition.bind(this);
  }
  

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://app.tor.us/embed.min.js";
    script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

  }

  showPosition(position) {
    this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
    console.log(
      "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude)
  }

  click() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      console.log('hi');
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render() {
    const {viewport, marker} = this.state;

    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
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
        <button onClick={this.click}>click me </button>
        <GeoDemo />

      </ReactMapGL> 
    );
  }
}

export default App;
