import React from 'react';
import {geolocated} from 'react-geolocated';

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
  
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Demo);