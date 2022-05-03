import * as d3 from 'd3'

export const message = (data) => {
  let message = ''
  message = message + Math.round(d3.csvFormat(data).length / 2670) + ' kb\n'
  message = message + data.columns.length + ' columns\n'
  message = message + data.length + ' rows\n'
  return message
}
