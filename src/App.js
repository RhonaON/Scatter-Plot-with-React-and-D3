import React from 'react'
import ReactDOM from 'react-dom'
import { scaleBand, scaleLinear, max } from 'd3'

import { useData } from './useData'

const width = 960
const height = 500

// Margin convention:
// How you make room for axes - margin = gaps (inner rect = where svg viz goes) therefore we use inner width and inner // //// height
const margin = { top: 20, right: 20, bottom: 20, left: 200 }

const App = () => {
  const data = useData()
  // initial state of null means data hasn't been loaded yet

  if (!data) {
    return <pre>Loading...</pre>
  }
  // date each row 'd' - rememvber d is d3 naming convention for row, and turn each data element into an svg rectangle <rect/>
  // giving x a value of x={0} will mean we have a horizontal bar chart - growing from left to right

  // Band scale:
  // y axis determined by the different countries - to figure out y position we need to use a construction called a scale - //// specifically an band scale (useful for ordinal attributes)
  // Band scale takes values from the 'data' space or domain (eg. countries) and return them in 'screen' space or the range //// of the scale
  // Bandwidth of the scale = width of one bar

  // Linear scale:
  // Domain of the linear sace is 2 number = minimum and maximum (from data space)
  // Range of linear scale also has min and max (within screen space)

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])

  // Max utility:
  // d3 provides a utility called 'max'
  // max takess two arguments - the data array, and an accesser fxn which takes as input d(one of our rows) => and returns in // this case d.Population
  // In this example - this will compare the population numbers across all rows and will return the maximum

  // Ticks utility within d3 Scale:
  //  .ticks()
  // defaults to 10 if you don't specify count
  //  {xScale.ticks().map()} - instead of row (d) this fxn returns a tick value
  // in the below function we return an svg <line /> element

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y1={0} y2={innerHeight} stroke='black' />
            <text
              dy='.90em'
              style={{ textAnchor: 'middle' }}
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            dy='.32em'
            x={-9}
            style={{ textAnchor: 'end' }}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {data.map((d) => (
          <rect
            key={d.Country}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
