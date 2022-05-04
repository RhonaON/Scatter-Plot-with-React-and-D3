import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { scaleBand, scaleLinear, max } from 'd3'

const csvUrl =
  'https://gist.githubusercontent.com/zhuekaterina/e9297725404b083b2f6467a37d7b3da2/raw/unpopulation.csv'

const width = 600
const height = 600

const App = () => {
  // initial state of null means data hasn't been loaded yet
  const [data, setData] = useState(null)

  // the built in '+d' unary convention is the popular alternative to parseFloat for turning strings into numbers
  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020']
      return d
    }

    d3.csv(csvUrl, row).then(setData)
  }, [])

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

  console.log(data[0])

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, height])

  // Max utility:
  // d3 provides a utility called 'max'
  // max takess two arguments - the data array, and an accesser fxn which takes as input d(one of our rows) => and returns in // this case d.Population
  // In this example - this will compare the population numbers across all rows and will return the maximum

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, width])

  return (
    <svg width={width} height={height}>
      {data.map((d) => (
        <rect
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
        />
      ))}
    </svg>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
