import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { KittyPin } from './Pin';
import constants from './constants.js';
import Geohash from 'latlon-geohash';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      places: null
    }

    //this.props.addKittyId(this.props.kitty.id)
    //this.props.updateWeather(this.props.kitty.id)
    //let weather = this.props.getWeather(this.props.kitty.id)
    //console.log(this.props.web3.toAscii(String(weather)))
  }

  componentDidMount = async () => { 
    let weather = this.props.getWeather(this.props.kitty.id)
    console.log(this.props.web3.toAscii(String(weather)))
  }


  fetchMapPoints = async() => {
    await fetch("https://map-api-direct.foam.space/search/poi?swLng=-73.983064&swLat=40.701126&neLng=-73.957916&neLat=40.796991", {   
    }).then(response => {
      return (response.status === 200) ? response.json() : null
    }).then((json) => {
      if (json) {
        this.setState({
          places: json
        });
        console.log(this.state.places)
      }
    });
  }

  render() {
    const {viewport, marker} = this.state;
  
    this.fetchMapPoints()
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={constants.MAPBOX_TOKEN}>
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-100}
          offsetLeft={-100}
          draggable>
            <KittyPin kittyUrl={this.props.kitty.image_url_png}/>
        </Marker>
      </ReactMapGL>
    );
  }
}


export default Game;
