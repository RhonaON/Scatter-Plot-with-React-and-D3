import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import { message } from './Message'

const csvUrl =
  'https://gist.githubusercontent.com/RhonaON/a43e64b04c7d3c6d79a06457723793cd/raw/cssNamedColours.csv'

const App = () => {
  // initial state of null means data hasn't been loaded yet
  const [data, setData] = useState(null)

  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])

  return <pre>Data is: {data ? message(data) : 'loading'}</pre>
}

export default App
