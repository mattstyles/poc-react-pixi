
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Stage, Sprite, Container, Text } from '@inlet/react-pixi'
import { random } from 'lodash'
import FPS from 'fps-now/react'

import sheet from './sheet.png'

const frames = [
  ...new Array(5).fill(0).map((_, i) => new PIXI.Rectangle(i * 85, 0, 85, 80)),
  ...new Array(5).fill(0).map((_, i) => new PIXI.Rectangle(i * 85, 80, 85, 80))
]

const baseTexture = PIXI.Texture.fromImage(sheet)
const textures = frames.map(frame => {
  return new PIXI.Texture(
    baseTexture,
    frame
  )
})

window.PIXI.settings.SCALE_MODE = window.PIXI.SCALE_MODES.NEAREST

const num = 1000
const width = 500
const height = 500

const createBunny = () => ({
  x: random(0, width),
  y: random(0, height),
  scale: random(0.2, 1),
  frame: random(0, 9)
})

let bunnies = new Array(num).fill(0).map(createBunny)

const appOpts = {
  background: 0x404040
}

const App = ({ bunnies }) => {
  return (
    <>
      <Stage width={500} height={500} options={appOpts}>
        <Container>
          {
            bunnies.map(({ x, y, scale, frame }, i) => (
              <Sprite key={i} texture={textures[frame]} x={x} y={y} scale={scale} />
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
