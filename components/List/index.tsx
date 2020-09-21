import React from 'react'

import Item from './Item'

const List: React.FunctionComponent & { Item: typeof Item } = ({ children }) => {
  return (
    <>
      <div className="list">
        {React.Children.map(children, (child) => child && <div className="list-cell">{child}</div>)}
      </div>
      <style jsx>{`
        .list {
          width: 100%;
        }
        .list-cell {
          width: 100%;
          padding: 15px;
          margin-bottom: 12px;

          background: #fff;
          box-shadow: 0px 3px 6px 0px rgba(217, 226, 233, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(219, 223, 227, 0.3);
        }
        .list > .list-cell:nth-last-of-type(1) {
          margin-bottom: 0;
        }

        @media screen and (max-width: 736px) {
          .list-cell {
            padding: 25px;
            margin-bottom: 24px;

            border-radius: 24px;
          }
        }
      `}</style>
    </>
  )
}

List.Item = Item

export default List
