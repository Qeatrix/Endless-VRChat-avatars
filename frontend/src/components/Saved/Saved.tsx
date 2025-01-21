import styles from "@/styles/endless.module.css"
import { invoke } from "@/api";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "@/types";
import { AvatarButtons } from "../avatarButtons";
import { UserContext } from "@/contexts";

import css from "./Saved.module.less";
import { SearchIcon } from "../../assets/SearchIcon";
import { AvatarElement } from "../Avatar/Avatar";
import { SpinnerIcon } from "../../assets/SpinnerIcon";
import { FavouriteIcon } from "../../assets/FavouriteIcon";


export const Saved = () => {
  const { userData, updateCurrentAvatar } = useContext(UserContext);

  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [searchValue, setSearchValue] = useState("");
  const [searchAvatarId, setSearchAvatarId] = useState("");
  const [isSearching, setIsSearching] = useState(false);


  const getSavedAvatars = async () => {
    const avatars = await invoke("avatars.get_saved_avatars")

    setAvatars(avatars)
  }

  const handleRemoveAvatar = (id: string) => {
    setAvatars((prev) => prev.filter((avatar) => avatar.id !== id));
  };

  const addToSavedAvatars = async (id: string) => {
    const result = await invoke("avatars.get_avatar_info_v2", id);
    const { avtr, title, thumbnail } = result as Avatar;

    if (title !== "" && thumbnail !== "") {
      await invoke("avatars.add_avatar_to_saved", {avtr, title, thumbnail})
    }
  }


  useEffect(() => {
    getSavedAvatars()
  }, [])

  useEffect(() => {
    console.log(userData);
  })


  return (
    <>
      <div className={css.Wrapper}>
        <div className={css.Bar}>
          <div className={css.Search}>
            <form onSubmit={(e) => {
              e.preventDefault();
              console.warn("Implement db search");
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
          <div className={css.Search}>
            <form onSubmit={(e) => {
              e.preventDefault();
              addToSavedAvatars(searchAvatarId);
            }}
            >
              <input
                disabled={isSearching ? true : false}
                type="text"
                placeholder="Avatar ID"
                className="input"
                onChange={(e) => setSearchAvatarId(e.target.value)}
                value={searchAvatarId}
              />
              <button
                className="btn"
                type="submit"
              >
                {/* <SearchIcon /> */}
                {isSearching ? <SpinnerIcon class={css["spinner"]} /> : <FavouriteIcon />}
              </button>
            </form>
          </div>
          <button className="btn" onClick={() => addToSavedAvatars(userData.currentAvatar)}>Add Current Avatar</button>
        </div>
        <div className={css.Container}>
          {avatars?.map(avatar => (
            <AvatarElement avatar={avatar} />
          ))}
        </div>
      </div>
    </>
  )

  // return (
  //   <div className={styles.background}>
  //     Saved

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
  //           <button className="btn avatar-btn" onClick={() => removeAvatarFromSaved(avatar.id)}>
  //             Remove
  //           </button>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // )
}
