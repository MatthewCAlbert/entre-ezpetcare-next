import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import qs from "query-string";
import { fakeDBTableName } from "@/data";
import { route } from "@/config/route";

const useSearch = (type: fakeDBTableName | null, target = route.search) => {
  const router = useRouter();
  const {q} = router.query;
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
    setSearchInput(String(q || ""));
  }, [q])

  const onSearch = (e: any)=>{
    e.preventDefault();
    router.push({
      pathname: target,
      search: qs.stringify({
        q: searchInput
      })
    })
  }

  const directSearch = (query: string)=>{
    router.push({
      pathname: target,
      search: qs.stringify({
        q: query
      })
    })
  }

  return { onSearch, directSearch, searchInput, setSearchInput, urlQuery: q };
}

export default useSearch
