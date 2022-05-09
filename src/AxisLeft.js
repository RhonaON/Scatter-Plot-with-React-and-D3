export const AxisLeft = ({ yScale, innerWidth }) =>
  yScale.ticks().map((tickValue) => (
    <g className='tick text'>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        dy='.32em'
        x={-9}
        style={{ textAnchor: 'end' }}
        y={yScale(tickValue)}
      >
        {tickValue}
      </text>
    </g>
  ))
