import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { Saved } from "@/components/Saved";
import { Search } from "@/components/Search";
import { Official } from "@/components/Official";

import styles from "@/styles/main.module.css"
import css from "./Main.module.less";
import { Catalog } from "@/types";


export const Main = () => {
  const [catalog, setCatalog] = useState<Catalog>(Catalog.SAVED)


  useEffect(() => {
    setCatalog(Catalog.SEARCH)
  }, [])

  return (
    <>
      <div className={css.Wrapper}>
        <Sidebar
          catalog={catalog}
          setCatalog={setCatalog}
        />
        {catalog === Catalog.SAVED ? (
          <Saved />
        ) : catalog === Catalog.OFFICIAL ? (
          <Official />
        ) : (
          <Search />
        )}
      </div>

    </>
  )
}
