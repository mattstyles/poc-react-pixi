
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Stage, Sprite, Container } from '@inlet/react-pixi'
import { random } from 'lodash'
import FPS from 'fps-now/react'
import styled from 'styled-components'

import bunnySprite from './bunny.png'
// const bunnySprite = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'

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

const Img = styled.div.attrs(props => ({
  style: {
    transform: `translate3d(${props.x}px, ${props.y}px, 0px) scale(${props.scale})`,
    backgroundImage: `url(${bunnySprite})`
  }
}))`
  position: absolute;
  width: 26px;
  height: 37px;
`

const Text = styled('span')`
  position: absolute;
  top: ${height + 100}px;
`

const App = ({ bunnies }) => {
  return (
    <>
      {
        bunnies.map(({ x, y, scale }, i) => (
          <Img key={i} x={x} y={y} scale={scale} />
        ))
      }
      <Text>{`number of bunnies: ${num}`}</Text>
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
