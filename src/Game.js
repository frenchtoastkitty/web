import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import Pin from './Pin';
import constants from './constants.js';

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
      }
    }

    render() {
      const {viewport, marker} = this.state;
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
              <Pin kittyUrl={this.props.kitty.image_url_png}/>
          </Marker>
        </ReactMapGL>
      );
    }
  }

export default Game;
