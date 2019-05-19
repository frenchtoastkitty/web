import React from 'react';
import constants from './constants.js';
import { useSpring, animated } from 'react-spring';

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