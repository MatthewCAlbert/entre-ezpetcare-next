import { cssVariables, mq, theme } from '@/config/emotion'
import { route } from '@/config/route'
import AuthContext from '@/context/AuthContext'
import { css } from '@emotion/react'
import Link from 'next/link'
import React, { useContext } from 'react'

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
      font-size: .87rem;
      font-weight: bold;
      i{
        font-size: 2.33rem;
      }
    `}
    >
      <span><i className={icon}></i></span>
      <span className="mt-2">{title}</span>
    </a>
    </Link>
  )
}

const MainPageNav = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="grid grid-cols-4 items-center justify-items-center mt-10 px-4 py-8 rounded-2xl shadow-lg" css={css`
      background-color: #FFD79A;
    `}>
      <NavLink href={route.doctor.index} title="Dokter" icon="fas fa-briefcase-medical"/>
      <NavLink href={route.shop.index} title="Toko" icon="fas fa-store"/>
      <NavLink href={route.grooming.index} title="Grooming" icon="fas fa-cut"/>
      <NavLink href={route.promo.index} title="Promo" icon="fas fa-percentage"/>
    </div>
  )
}

export default MainPageNav