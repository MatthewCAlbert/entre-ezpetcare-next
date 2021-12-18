import React from "react";
import { css } from "@emotion/react";
import { fakeDBTableName } from "@/data";
import useSearch from "@/hooks/useSearch";

const SearchSection: React.FC<{
  type?: fakeDBTableName,
  targetUrl?: string
}> = ({type, targetUrl = "/search"}) => {
  const { onSearch, searchInput, setSearchInput } = useSearch(type || null, targetUrl);

  return (
    <div className="flex justify-between items-center shadow rounded-2xl bg-white px-6 py-1">
      <form onSubmit={onSearch} className="d-flex justify-content-end flex-grow">
        <input autoFocus type="text" autoComplete="off" onChange={(e)=>setSearchInput(e.target.value)} className="form-control w-full" value={String(searchInput)} placeholder={`Kata kunci`} css={css`
          border: none;
        `} />
      </form> 
      <i className="ml-2 fas fa-search ms-2"></i>
    </div>
  )
}

export default SearchSection
