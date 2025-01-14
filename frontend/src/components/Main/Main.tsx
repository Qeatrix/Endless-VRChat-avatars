import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { Saved } from "@/components/Saved";
import { Search } from "@/components/Search";
import { Official } from "@/components/Official";

import styles from "@/styles/main.module.css"
import css from "./Main.module.less";
import { Catalog } from "@/types";
import { Settings } from "../settings";
import { Upload } from "../upload";
import { Donation } from "../donation";


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
        ) : catalog === Catalog.SEARCH ? (
          <Search />
        ) : catalog === Catalog.SETTINGS ? (
          <Settings />
        ) : catalog === Catalog.UPLOAD ? (
          <Upload />
        ) : (
          <Donation />
        )}
      </div>

    </>
  )
}
