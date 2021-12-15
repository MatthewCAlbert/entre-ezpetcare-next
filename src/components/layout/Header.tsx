import { cssVariables, mq, theme } from '@/config/emotion'
import { css } from '@emotion/react'
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import qs from "query-string";
import Image from 'next/image';

const Header: React.FC<{
  forceSearchOpen?: boolean,
  simpleBack?: boolean,
  customTitle?: string,
  customCallback?: {():any}
}> = ({forceSearchOpen = false, simpleBack = false, ...props}) => {
  const router = useRouter();
  const scrollY = useRef(0);
  const [navScrolled, setNavScrolled] = useState(false);

  const isSearchPath = router.pathname === "/search";
  const [searchOpen, setSearchOpen] = useState((forceSearchOpen || isSearchPath));
  const [searchInput, setSearchInput] = useState(router.query?.q || "");

  useEffect(() => {
    const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // const innerWidth = window.innerWidth;
    if (currentScrollY > 20) {
        if (navScrolled !== true) setNavScrolled(true)
    } else {
        if (navScrolled !== false) setNavScrolled(false)
    }

    scrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navScrolled]);

  const onBack = ()=>{
    if( !forceSearchOpen && !isSearchPath && !simpleBack )
      setSearchOpen(false);
    else if( props?.customCallback )
      props.customCallback();
    else
    router.back();
  }

  const onSearch = (e: any)=>{
    e.preventDefault();
    router.push({
      pathname: "/search",
      search: qs.stringify({
        q: searchInput
      })
    })
  }

  return (
    <header css={css`
      position: fixed;
      z-index: 10;
      top: 0;
      display: flex;
      width: 100%;
      justify-content: center;
      height: ${cssVariables.headerHeight};
      ${ navScrolled ? css`
        background-color: ${theme.primaryorange};
        align-items: center;
      ` : css`
        align-items: flex-end;
      ` }
      transition: .2s all;
      &.search-active{
        background-color: white;
        border-bottom: 1px solid #ececec;
      }
      .app-logo{
        width: 100%;
        min-width: 50px;
        height: 50px;
        position: relative;
      }
      .app-title{
        color: white;
        font-size: 1.3rem;
      }
      .header-inner{
        max-width: ${cssVariables.maxWidth};
        width: 100%;
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `} className={clsx((searchOpen) && "search-active")}>
      <div className="header-inner">
        {
          !searchOpen && !simpleBack ?
          <>
            <div className="flex items-center no-select" css={css`
              cursor: default;
            `}>
              <div className="app-logo">
                <Image src="/assets/img/favicon.png" alt="logo" unoptimized={true} layout="fill" objectFit="cover"/>
              </div>
            </div>
            <div className="grow ml-3 flex justify-end">
              <div onClick={()=>setSearchOpen(true)} className="form-control shadow-md px-6 rounded-full text-gray-600 bg-white" css={css`
                cursor: text;
              `}>
                <span className="text-gray-400">cari disini</span> <i className="ml-2 fas fa-search ms-2"></i>
              </div>
            </div>
          </>
          :
          <>
            <div className="flex items-center h-14 px-2">
              <i className="fas fa-chevron-left ms-2 cursor-pointer text-2xl" onClick={onBack}></i>
            </div>
            <div className="grow ml-3">
              {
                !simpleBack ? (
                  <form onSubmit={onSearch} className="d-flex justify-content-end">
                    <input autoFocus type="text" autoComplete="off" onChange={(e)=>setSearchInput(e.target.value)} className="form-control w-full" value={String(searchInput)} placeholder={`Coba cari "Makanan Anjing"`} css={css`
                      border: none;
                    `} />
                  </form>
                ) : (
                  <h1 className="mb-0 h5 text-center mr-4">{props.customTitle || ""}</h1>
                )
              }
            </div>
          </>
        }
      </div>
    </header>
  )
}

export default Header