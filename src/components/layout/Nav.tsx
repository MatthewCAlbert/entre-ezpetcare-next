import { cssVariables, mq, theme } from '@/config/emotion'
import { route } from '@/config/route'
import AuthContext from '@/context/AuthContext'
import { css } from '@emotion/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import BottomNavTemplate from './BottomNavTemplate'

const NavLink: React.FC<{
  href: string,
  title: string,
  icon?: string
}> = ({href, title, icon, ...props})=>{
  return (
    <Link href={href} passHref={true}>
      <a css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${theme.darkbrown};
      padding: 0 10px;
      width: 90px;
      padding-top: 5px;
      font-size: .83rem;
      font-weight: bold;
      i{
        font-size: 1.73rem;
      }
    `}
    >
      <span><i className={icon}></i></span>
      <span>{title}</span>
    </a>
    </Link>
  )
}

const Nav = () => {
  const auth = useContext(AuthContext);

  return (
    <BottomNavTemplate background={theme.primaryorange}>
      <div className="nav-inner py-2 mt-1">
        <NavLink href={route.index} title="Beranda" icon="fas fa-home"/>
        <NavLink href={route.account.order} title="Pesanan" icon="fas fa-clipboard-list"/>
        <NavLink href={route.account.schedule} title="MyJadwal" icon="fas fa-calendar-alt"/>
        {/* <NavLink href={route.account.schedule} title="Chat" icon="fas fa-comment-alt"/> */}
        <NavLink href={route.account.index} title="Akun" icon="fas fa-user"/>
      </div>
    </BottomNavTemplate>
  )
}

export default Nav