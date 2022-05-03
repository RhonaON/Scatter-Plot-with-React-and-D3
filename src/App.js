import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { arc, pie } from 'd3'

const csvUrl =
  'https://gist.githubusercontent.com/RhonaON/a43e64b04c7d3c6d79a06457723793cd/raw/cssNamedColours.csv'

const width = 1400
const height = 1200
const centreX = width / 2
const centreY = height / 2

const pieArc = arc().innerRadius(100).outerRadius(450)

const App = () => {
  // initial state of null means data hasn't been loaded yet
  const [data, setData] = useState(null)

  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])

  if (!data) {
    return <pre>Loading..</pre>
  }

  const colourPie = pie().value(1)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centreX}, ${centreY})`}>
        {colourPie(data).map((d) => (
          <path fill={d.data['Hex rgb']} d={pieArc(d)} />
        ))}
      </g>
    </svg>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
