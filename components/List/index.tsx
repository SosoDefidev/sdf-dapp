import React from 'react'

import Item from './Item'

const List: React.FunctionComponent & { Item: typeof Item } = ({ children }) => {
  return (
    <>
      <div className="list">
        {React.Children.map(
          children,
          (child, key) =>
            child && (
              <div className={key == 1 || key == 2 || key == 4 ? 'gay_box list-cell' : 'list-cell'}>
                {child}
              </div>
            )
        )}
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
        .gay_box {
          filter: grayscale(100%);
          -webkit-filter: grayscale(100%);
          -moz-filter: grayscale(100%);
          -ms-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
          filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
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
