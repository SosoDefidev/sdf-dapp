import React from 'react'

export type DataType = {
  title?: React.ReactNode
  width?: string | number
  align?: 'left' | 'right' | 'center'
}
export type Props = {
  data: DataType[]
}

const Item: React.FunctionComponent<Props> = ({ data }) => {
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
      <style jsx>{`
        .item {
          display: flex;
          align-items: center;
        }

        .item > span {
          flex: 1 1 auto;
        }
      `}</style>
    </>
  )
}

export default Item
