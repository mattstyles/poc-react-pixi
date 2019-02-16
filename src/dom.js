
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

let bunnies = new Array(num).fill(0).map(() => ({
  x: random(0, width),
  y: random(0, height)
}))

const appOpts = {
  background: 0x404040
}

const Img = styled.div.attrs(props => ({
  style: {
    transform: `translate3d(${props.x}px, ${props.y}px, 0px)`
  }
}))`
  position: absolute;
  width: 26px;
  height: 37px;
  background-image: url(${bunnySprite});
`

const App = ({ bunnies }) => {
  return (
    <>
      {
        bunnies.map(({ x, y }, i) => (
          <Img key={i} x={x} y={y} />
        ))
      }
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
  bunnies = bunnies.map(() => ({
    x: random(0, width, true),
    y: random(0, height, true)
  }))

  render(
    <>
      <App bunnies={bunnies} />
      <FPS />
    </>,
    document.querySelector('.js-main')
  )
})
