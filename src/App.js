// Import libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { scaleLinear, extent, format } from 'd3'

// Import internal files
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'

const width = 960
const height = 500

const margin = { top: 20, right: 60, bottom: 100, left: 220 }
const xAxisLabelOffset = 50

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = (d) => d.sepal_length
  const yValue = (d) => d.sepal_width

  const siformat = format('.2s')
  const xAxisTickFormat = (tickValue) => siformat(tickValue).replace('G', 'B')

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className='axis-label'
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor='middle'
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          toolTipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
