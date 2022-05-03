import React, { useState } from 'react'
import * as d3 from 'd3'
import '../src/styles.css'

const csvUrl =
  'https://gist.githubusercontent.com/RhonaON/a43e64b04c7d3c6d79a06457723793cd/raw/cssNamedColours.csv'

const message = (data) => {
  let message = ''
  message = message + Math.round(d3.csvFormat(data).length / 2670) + ' kb\n'
  message = message + data.columns.length + ' columns\n'
  message = message + data.length + ' rows\n'
  return message
}

const App = () => {
  // initial state of null means data hasn't been loaded yet
  const [data, setData] = useState(null)

  d3.csv(csvUrl).then((data) => {
    setData(data)
  })

  return <pre>Data is: {data ? message(data) : 'loading'}</pre>
}

export default App
