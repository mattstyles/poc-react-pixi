
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Stage, Sprite, Container, Text } from '@inlet/react-pixi'
import { random } from 'lodash'
import FPS from 'fps-now/react'
// import PIXI from 'pixi.js'

import bunnySprite from './bunny.png'
// const bunnySprite = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'

window.PIXI.settings.SCALE_MODE = window.PIXI.SCALE_MODES.NEAREST

const num = 1000
const width = 500
const height = 500

const createBunny = () => ({
  x: random(0, width, true),
  y: random(0, height, true),
  scale: random(0.5, 2.5)
})

let bunnies = new Array(num).fill(0).map(createBunny)

const appOpts = {
  background: 0x404040
}

const textStyle = new window.PIXI.TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 23,
  fontWeight: 400,
  fill: ['#ffffff'], // gradient
  stroke: null,
  strokeThickness: 5
})

const App = ({ bunnies }) => {
  return (
    <>
      <Stage width={500} height={500} options={appOpts}>
        <Container>
          {
            bunnies.map(({ x, y, scale }, i) => (
              <Sprite key={i} image={bunnySprite} x={x} y={y} scale={scale} />
              // <Text key={i} text={'#'} x={x} y={y} style={textStyle} />
            ))
          }
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
//   bunnies = bunnies.map(createBunny)
//
//   render(
//     <>
//       <App bunnies={bunnies} />
//       <FPS />
//     </>,
//     document.querySelector('.js-main')
//   )
// }, 200)
