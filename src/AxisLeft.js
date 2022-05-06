export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <g className='tick text'>
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
