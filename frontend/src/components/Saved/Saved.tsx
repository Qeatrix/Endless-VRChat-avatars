import styles from "@/styles/endless.module.css"
import { invoke } from "@/api";
import { useEffect, useState } from "react";
import { Avatar } from "@/types";
import { AvatarButtons } from "../avatarButtons";

import css from "./Saved.module.less";
import { SearchIcon } from "../../assets/SearchIcon";


export const Saved = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [searchValue, setSearchValue] = useState("");


  const getSavedAvatars = async () => {
    const avatars = await invoke("avatars.get_saved_avatars")

    setAvatars(avatars)
  }

  const handleRemoveAvatar = (id: string) => {
    setAvatars((prev) => prev.filter((avatar) => avatar.id !== id));
  };


  useEffect(() => {
    getSavedAvatars()
  }, [])


  return (
    <>
      <div className={css.Wrapper}>
        <div className={css.Search}>
          <input
            type="text"
            placeholder="Search"
            className="input"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={() => console.warn("Implement db search")}
            className="btn"
          >
            <SearchIcon />
          </button>
        </div>
        <div className={css.Container}>
          {avatars?.map(avatar => (
            <div className={css.Avatar}>
              <img
                src={avatar.thumbnailImageUrl}
                alt="Avatar Thumbnail" className={css.Avatar}
              />
              <div className={css.DetailsContainer}>
                <div className={css.UpperBar}>
                  <div className={css.ActionContainer}>
                    <AvatarButtons avatar={avatar} css={css} remove onRemove={handleRemoveAvatar} />
                  </div>
                </div>
                <p>{avatar.name}</p>
              </div>
            </div>
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
