import React from 'react'

export type DataType = {
  title?: React.ReactNode
  width?: string | number
  align?: 'left' | 'right' | 'center'
}
export type Props = {
  data: DataType[]
  renderExpand?: () => React.ReactNode
}

const Item: React.FunctionComponent<Props> = ({ data, renderExpand }) => {
  return (
    <>
      <div className="item">
        {data.map(({ title, align, width }, index) => (
          <span
            key={index}
            style={{
              width,
              textAlign: align
            }}>
            {title}
          </span>
        ))}
      </div>
      {renderExpand ? <div className="expand">{renderExpand()}</div> : null}
      <style jsx>{`
        .item {
          display: flex;
          align-items: center;
        }

        .item > span {
          flex: 1 1 auto;
        }

        .expand {
          margin-top: 20px;
        }
      `}</style>
    </>
  )
}

export default Item
