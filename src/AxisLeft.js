export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <text
      key={tickValue}
      dy='.32em'
      x={-9}
      style={{ textAnchor: 'end' }}
      y={yScale(tickValue) + yScale.bandwidth() / 2}
    >
      {tickValue}
    </text>
  ))
