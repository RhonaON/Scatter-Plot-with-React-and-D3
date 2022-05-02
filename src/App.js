import React, { useState, useCallback } from 'react'
import * as d3 from 'd3'

const width = 960
const height = 500
const circleRadius = 30
const initialMousePosition = { x: width / 2, y: height / 2 }

const fetchText = async (url) => {
  const response = await fetch(url)
  return await response.text()
}

const csvUrl =
  'https://gist.githubusercontent.com/RhonaON/a43e64b04c7d3c6d79a06457723793cd/raw/cssNamedColours.csv'

fetchText(csvUrl).then((text) => {
  console.log(d3.csvParse(text))
})

const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition)
  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event
      setMousePosition({ x: clientX, y: clientY })
    },
    [setMousePosition]
  )
  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
    </svg>
  )
}

export default App
