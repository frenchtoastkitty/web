import React from 'react';
import constants from './constants.js';
import { useSpring, animated } from 'react-spring';

function Pin({ kittyUrl }) {
//    let radian = .10 * Math.PI
//    const { radians } = useSpring({
//      to: async next => {
//        while (true) {
//          await next({ radians: radian })
//          radian = -radian
//        }
//      },
//      from: { radians: radian },
//      config: { duration: 200 },
//      reset: false,
//    })
    return (
      <img 
        src={kittyUrl}
        alt={'kitty'}
        style={{
          width: constants.kitty_width, height: constants.kitty_height
        }} 
      />
    );
  }

export default Pin;
