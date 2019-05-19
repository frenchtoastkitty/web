import React from 'react';
import constants from './constants.js';
import { useSpring, animated } from 'react-spring';
import cloud from "./lc.svg"
import clear from "./c.svg"
import snow from "./sn.svg"
import rain from "./hr.svg"

export function KittyPin({ kittyUrl }) {

  let weather = "Light Cloud";
  let weatherimage = null
  if (["Snow", "Hail", "Sleet"].includes(weather)) {
    // code block
    weatherimage = snow
  } else if (["Thunderstorm", "Heavy Rain", "Light Rain", "Showers"].includes(weather)) {
    // code block
    weatherimage = rain
  } else if  (["Light Cloud", "Heavy Cloud"].includes(weather)) {
      weatherimage = cloud
  } else {
      weatherimage = clear
    }
    return (
      <div>
      <img
        src={weatherimage}
        alt={'cloud'}
       />
      <img
        src={kittyUrl}
        alt={'kitty'}
        style={{
          width: constants.kitty_width, height: constants.kitty_height
        }}
      />
      </div>
    );
  }

  const pinStyle = {
    fill: '#FF33E9',
    stroke: 'none'
  };

export function Pin() {
  return (
    <svg height={10} viewBox="0 0 24 24" style={pinStyle}>
        <path d={constants.ICON} />
      </svg>
  )
}

