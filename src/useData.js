import { useState, useEffect } from 'react'
import { csv } from 'd3'

const csvUrl =
  'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'

// initial state of null means data hasn't been loaded yet
export const useData = () => {
  const [data, setData] = useState(null)
  // the built in '+d' unary convention is the popular alternative to parseFloat for turning strings into numbers
  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020']
      return d
    }

    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10))
    })
  }, [])
  return data
}
