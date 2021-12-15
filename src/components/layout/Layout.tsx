import { cssVariables } from '@/config/emotion';
import { css } from '@emotion/react';
import clsx from 'clsx';
import React from 'react'
import Header from './Header';
import Nav from './Nav';

const Layout: React.FC<{
  position?: "start" | "center",
  enableHeader?: boolean,
  enableNav?: boolean
}> = ({enableNav=true, enableHeader=true, children, ...props}) => {
  return (
    <>
    {
      enableHeader && <Header/>
    }
    <div css={css`
      flex-grow: 1;
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      max-width: ${cssVariables.maxWidth};
      overflow: hidden;
      main#main{
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        padding-top: ${cssVariables.headerHeight};
        padding-bottom: ${cssVariables.navHeight};
        background-color: #F5F5F5;
      }
    `}>
      <main id="main" className={clsx(props?.position === "center" && "justify-center")}>
        {children}
      </main>
      {
        enableNav && <Nav/>
      }
    </div>
    </>
  )
}

export default Layout