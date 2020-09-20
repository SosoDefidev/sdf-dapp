import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

const TopPanel: React.FunctionComponent<{ type?: 'primary' }> = ({ children, type }) => {
  const theme = useTheme()

  return (
    <>
      <div className={'panel' + (type === 'primary' ? ' primary' : '')}>
        <div className="child">{children}</div>
      </div>
      <style jsx>{`
        .panel {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 25px 30px;
          margin-right: 20px;

          background: #fff;
          box-shadow: 0px 5px 12px 0px rgba(217, 226, 233, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(219, 223, 227, 0.3);
        }
        .panel:nth-last-of-type(1) {
          margin-right: 0;
        }

        .panel.primary {
          background-color: ${theme['@primary-color']};

          color: #fff;
        }

        .child {
          flex: 1;
        }
      `}</style>
    </>
  )
}

const TopPanelContainer: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }
      `}</style>
    </>
  )
}

export { TopPanel, TopPanelContainer }
