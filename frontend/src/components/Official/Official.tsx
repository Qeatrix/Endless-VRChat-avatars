import styles from "@/styles/official.module.css"
import { invoke } from "@/api";
import { useEffect, useState } from "react";
import { Avatar } from "@/types";
import { AvatarButtons } from "@/components/avatarButtons";

import css from "./Official.module.less";
import { SearchIcon } from "../../assets/SearchIcon";


export const Official = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [searchValue, setSearchValue] = useState("");


  const getUploadedAvatars = async () => {
    const avatars = await invoke("avatars.get_uploaded_avatars")

    console.log(avatars);

    // setAvatars(avatars as Avatar[]);
  }


  const getFavoriteAvatars = async (tag: string) => {
    //avatars1 -> avatars6
    const avatars = await invoke("avatars.get_favorite_avatars", tag)

    console.log(avatars);
    if (!avatars.error) {

      setAvatars(avatars)
    }
  }


  useEffect(() => {
    // getUploadedAvatars()
    getFavoriteAvatars("avatars1")
  }, [])


  const changeAvatar = async (id: string) => {
    await invoke("avatars.change_avatar", id)
  }


  const addToSavedAvatars = async (avtr: string, title: string, thumbnail: string) => {
    await invoke("avatars.add_avatar_to_saved", {avtr, title, thumbnail})
  }


  // return (
  //   <div className={styles.background}>
  //     Official

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

  return (
    <>
    <div className={css.Wrapper}>
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
                  <AvatarButtons avatar={avatar} css={css} />
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
}
