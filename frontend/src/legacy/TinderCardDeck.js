import React, { Component, useState } from 'react';
import './css/TinderCardDeck.css';
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import TinderCard from './TinderCard';

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});

const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const data=[{age:1},{age:2},{age:3}];

function TinderCardDeck () {
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(3, i => ({...to(i), from: from(i)}));
  const bind = useGesture(
    ({
       args: [index],
       down,
       delta: [xDelta],
       distance,
       direction: [xDir],
       velocity
     }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === data.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );
  return (
    <div className="TinderCardDeck">
      {props.map( ({ x, y, rot, scale }, i) => (<TinderCard i={i}
                                                            x={x}
                                                            y={y}
                                                            rot={rot}
                                                            scale={scale}
                                                            trans={trans}
                                                            data={data[i]}
                                                            bind={bind}
                                                            />))}
    </div>
  );
}

export default TinderCardDeck;
