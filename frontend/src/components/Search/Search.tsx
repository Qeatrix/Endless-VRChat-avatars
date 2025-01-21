import { invoke } from "@/api";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarSearch } from "@/types";

import { FavouriteIcon } from "../../assets/FavouriteIcon";
import styles from "@/styles/search.module.css"
import css from "./Search.module.less";
import { AvatarButtons } from "@/components/avatarButtons";
import { SearchIcon } from "@/assets/SearchIcon";
import { Pagination } from "./pagination";
import { Preloader } from "../Preloader";
import { SpinnerIcon } from "../../assets/SpinnerIcon";
import { AvatarElement } from "../Avatar/Avatar";
import { Wrapper } from "../Wrapper/Wrapper";


export const Search = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [searchValue, setSearchValue] = useState("manuka")
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const wrapper = useRef(null);

  const searchAvatars = async () => {
    setIsSearching(true);

    // query, page
    const request: AvatarSearch = await invoke("avatars.search_avatars", searchValue, currentPage)

    setIsSearching(false);
    console.log(request.avatars);

    setAvatars(request.avatars)
    setTotalPages(request.totalPages)
  }

  useEffect(() => {
    searchAvatars()
  }, [])


  useEffect(() => {
    console.log(wrapper);
    if (wrapper.current) {
      (wrapper.current as HTMLDivElement).scrollTo(0, 0);
    } else {
      console.log("not found");
    }
  }, [currentPage])

  return (
    <>
      <Wrapper containerRef={wrapper}>
          <div className={css.Search}>
            <form onSubmit={(e) => {
              e.preventDefault();
              searchAvatars();
            }}
            >
              <input
                disabled={isSearching ? true : false}
                type="text"
                placeholder="Search"
                className="input"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <button
                className="btn"
                type="submit"
              >
                {/* <SearchIcon /> */}
                {isSearching ? <SpinnerIcon class={css["spinner"]} /> : <SearchIcon />}
              </button>
            </form>
          </div>
          <div className={css.Container}>
            {avatars?.map(avatar => (
              <AvatarElement avatar={avatar} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchAvatars={searchAvatars}
            searchValue={searchValue}
            totalPages={totalPages}
          />
      </Wrapper>
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
