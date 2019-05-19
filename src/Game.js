import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';
import Pin from './Pin';
import constants from './constants.js';

function Game() {
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
          className={'thing'}>
              <Pin/>
        </Marker>
      </ReactMapGL>
    );
  }

export default Pin;
