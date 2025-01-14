import { invoke } from "@/api";
import { useEffect, useState } from "react";
import { Avatar, AvatarSearch } from "@/types";

import { FavouriteIcon } from "../../assets/FavouriteIcon";
import styles from "@/styles/search.module.css"
import css from "./Search.module.less";
import { AvatarButtons } from "@/components/avatarButtons";
import { SearchIcon } from "@/assets/SearchIcon";
import { Pagination } from "./pagination";
import { Preloader } from "../Preloader";


export const Search = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [searchValue, setSearchValue] = useState("manuka")
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const searchAvatars = async (query: string, page: number) => {
    setIsSearching(true);

    // query, page
    const request: AvatarSearch = await invoke("avatars.search_avatars", query, page)

    setIsSearching(false);
    console.log(request.avatars);

    setAvatars(request.avatars)
    setTotalPages(request.totalPages)
  }

  useEffect(() => {
    searchAvatars(searchValue, currentPage)
  }, [])


  return (
    <>
      <div className={css.Wrapper}>
        <div className={css.Search}>
          <input
            disabled={isSearching ? true : false}
            type="text"
            placeholder="Search"
            className="input"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button
            onClick={() => searchAvatars(searchValue, currentPage)}
            className="btn"
          >
            {/* <SearchIcon /> */}
            {isSearching ? <p>Searching</p>: <SearchIcon />}
          </button>
        </div>
        <div className={css.Container}>
          {avatars?.map(avatar => (
            <div className={css.Avatar} key={avatar.id}>
              <img
                src={avatar.thumbnailImageUrl}
                alt="Avatar Thumbnail" className={css.Avatar}
              />
              <div className={css.DetailsContainer}>
                <div className={css.UpperBar}>
                  <div className={css.ActionContainer}>
                    <AvatarButtons avatar={avatar} css={css} />
                  </div>
                </div>
                <p>{avatar.name}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchAvatars={searchAvatars}
          searchValue={searchValue}
          totalPages={totalPages}
        />
      </div>
    </>
  )

  // return (
  //   <div className={styles.background}>
  //     Search
  //     total pages {totalPages}

  //     {avatars?.map(avatar => (
  //       <div
  //         key={avatar.id}
  //         className="avatar-block"
  //       >
  //         <p>{avatar.name}</p>
  //         <img src={avatar.thumbnailImageUrl} />
  //         <div className="avatar-buttons">
  //           <button className="btn avatar-btn" onClick={() => changeAvatar(avatar.id)}>
  //             Select
  //           </button>
  //           <button className="btn avatar-btn" onClick={() => addToSavedAvatars(avatar.id, avatar.name, avatar.thumbnailImageUrl)}>
  //             To Custom
  //           </button>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // )
}
