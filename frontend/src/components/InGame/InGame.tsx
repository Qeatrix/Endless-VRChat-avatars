import { invoke } from "@/api";
import { useEffect, useState } from "react";
import { Avatar } from "@/types";
import { AvatarButtons } from "@/components/avatarButtons";

import css from "./InGame.module.less";
import { SearchIcon } from "../../assets/SearchIcon";
import { AvatarElement } from "../Avatar/Avatar";
import { Wrapper } from "../Wrapper/Wrapper";


const categories = [
  {
    "name": "avatars1",
    "id": "1"
  },
  {
    "name": "avatars2",
    "id": "2"
  },
  {
    "name": "avatars3",
    "id": "3"
  },
  {
    "name": "avatars4",
    "id": "4"
  },
  {
    "name": "avatars5",
    "id": "5"
  },
  {
    "name": "avatars6",
    "id": "6"
  },
  {
    "name": "uploaded",
    "id": "7"
  }
]

export const InGame = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [searchValue, setSearchValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState(categories[0]);


  const getUploadedAvatars = async () => {
    const avatars = await invoke("avatars.get_uploaded_avatars")

    console.log(avatars);
    if (!avatars.error) {
      setAvatars(avatars)
    }
  }


  const getFavoriteAvatars = async (tag: string) => {
    //avatars1 -> avatars6
    console.log("run");
    const avatars = await invoke("avatars.get_favorite_avatars", tag)

    console.log(avatars);
    if (!avatars.error) {
      setAvatars(avatars)
    }
  }


  useEffect(() => {
    // getUploadedAvatars()

    if (currentCategory.name === "uploaded") {
      getUploadedAvatars();
    } else {
      getFavoriteAvatars(currentCategory.name);
    }
  }, [currentCategory])

  useEffect(() => {
    console.log(currentCategory);
  })


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
      <Wrapper>
        <div className={css.CategoriesContainer}>
          {categories.map(category => (
            <button
              className={`btn ${currentCategory.id === category.id ? `${css.Selected}` : ``}`}
              onClick={() => setCurrentCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className={css.Container}>
          {avatars?.map(avatar => (
            <AvatarElement avatar={avatar} />
          ))}
        </div>
    </Wrapper>
  </>
  )
}
