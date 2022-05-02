import React from 'react'
import ReactDOM from 'react-dom'

const width = 960
const height = 500
const circleX = width / 2
const circleY = height / 2
const circleRadius = 30

const App = () => (
  <svg width={width} height={height}>
    <circle cx={circleX} cy={circleY} r={circleRadius} />
  </svg>
)

export default App
