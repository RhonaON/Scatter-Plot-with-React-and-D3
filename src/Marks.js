export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  toolTipFormat,
}) =>
  // circles accept cx and cy - centre x and y positions - // instead of x and y
  data.map((d) => (
    <circle
      className='mark'
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
    >
      <title>{toolTipFormat(xValue(d))}</title>
    </circle>
  ))
