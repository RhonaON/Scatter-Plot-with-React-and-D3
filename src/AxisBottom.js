// create AxisBottom fxn - using previous xScale logic and passing in xScale and innerHeight as props

// Ticks utility within d3 Scale:
//  .ticks()
// defaults to 10 if you don't specify count
//  {xScale.ticks().map()} - instead of row (d) this fxn returns a tick value
// in the below function we return an svg <line /> element

export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map((tickValue) => (
    <g
      className='tick'
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      <line y1={0} y2={innerHeight} />
      <text dy='.90em' style={{ textAnchor: 'middle' }} y={innerHeight + 3}>
        {tickValue}
      </text>
    </g>
  ))
