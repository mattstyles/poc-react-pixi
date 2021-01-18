
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import {
  Stage, Sprite, Container, Text
} from '@inlet/react-pixi/dist/react-pixi.module'
import { random } from 'lodash'
import FPS from 'fps-now/react'
import { settings, SCALE_MODES, TextStyle } from 'pixi.js'

import bunnySprite from './bunny.png'
// const bunnySprite = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'

settings.SCALE_MODE = SCALE_MODES.NEAREST

const num = 64 * 64
const width = 800
const height = 800

const createBunny = () => ({
  x: random(0, width, true),
  y: random(0, height, true),
  scale: random(0.5, 2.5)
})

const mapToSprite = ({ x, y, scale }, i) => (
  <Sprite
    key={i}
    image={bunnySprite}
    x={x}
    y={y}
    scale={scale}
    anchor={0.5}
  />
)

let bunnies = new Array(num).fill(0)
  .map(createBunny)
  .map(mapToSprite)

const appOpts = {
  background: 0x404040
}

const textStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 23,
  fontWeight: 400,
  fill: ['#ffffff'], // gradient
  stroke: null,
  strokeThickness: 5
})

// {
//   bunnies.map(({ x, y, scale }, i) => (
//     <Sprite
//       key={i}
//       image={bunnySprite}
//       x={x}
//       y={y}
//       scale={scale}
//       anchor={0.5}
//     />
//     // <Text key={i} text={'#'} x={x} y={y} style={textStyle} />
//   ))
// }

const App = ({ bunnies }) => {
  return (
    <>
      <Stage width={width} height={height} options={appOpts}>
        <Container>
          {bunnies}
        </Container>
      </Stage>
      <div>{`number of bunnies: ${num}`}</div>
    </>
  )
}

render(
  <>
    <App bunnies={bunnies} />
    <FPS />
  </>,
  document.querySelector('.js-main')
)

document.addEventListener('keydown', () => {
  bunnies = bunnies.map(createBunny)

  render(
    <>
      <App bunnies={bunnies} />
      <FPS />
    </>,
    document.querySelector('.js-main')
  )
})

// setInterval(() => {
//   // This returns a new object each time
//   // bunnies = bunnies.map(createBunny)
//
//   // for (let b of bunnies) {
//   //   b.x = b.x + random(-2, 2)
//   //   b.y = b.y + random(-2, 2)
//   //
//   //   if (b.x > width || b.x < 0) {
//   //     b.x = width * 0.5
//   //   }
//   //
//   //   if (b.y > height || b.y < 0) {
//   //     b.y = height * 0.5
//   //   }
//   // }
//
//   render(
//     <>
//       <App bunnies={bunnies} />
//       <FPS />
//     </>,
//     document.querySelector('.js-main')
//   )
// }, 1000 / 30)

const frame = () => {
  render(
    <>
      <App bunnies={bunnies} />
      <FPS />
    </>,
    document.querySelector('.js-main')
  )

  window.requestAnimationFrame(frame)
}
frame()

window.bunnies = bunnies
