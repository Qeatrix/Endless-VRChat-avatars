import { useContext, useEffect, useState } from "react";
import { FavouriteIcon } from "@/assets/FavouriteIcon";
import { invoke } from "@/api";
import { Avatar } from "@/types";
import { ApplyIcon } from "@/assets/ApplyIcon";
import { UserContext } from "@/contexts";
import { TrashIcon } from "../assets/TrashIcon";


type FavouriteAvatarButtonProps = {
  avatar: Avatar,
  css: CSSModuleClasses,
  remove?: boolean,
  onRemove?: (id: string) => void,
};

export const AvatarButtons: React.FC<FavouriteAvatarButtonProps> = ({ avatar, css, remove, onRemove }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { userData, updateCurrentAvatar } = useContext(UserContext);

  const checkAvatarFavourite = async (avtr: string) => {
    const result = await invoke("avatars.check_avatar_exists", avtr)
    console.log(result);
    return result;
  }

  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      try {
        const result = await checkAvatarFavourite(avatar.id);
        if (result) {
          setIsFavourite(true);
        } else {
          setIsFavourite(false);
        }
      } catch (error) {
        console.error('Error checking avatar favourite status:', error);
      }
    };

    fetchFavouriteStatus()
  }, [avatar.id])

  const addToSavedAvatars = async (avtr: string, title: string, thumbnail: string) => {
    console.log(`${avtr} | ${title} | ${thumbnail}`);
    await invoke("avatars.add_avatar_to_saved", {avtr, title, thumbnail})
    setIsFavourite(true);
  }

  const changeAvatar = async (id: string) => {
    await invoke("avatars.change_avatar", id)
    updateCurrentAvatar(avatar.id, avatar.name, avatar.thumbnailImageUrl);
  }

  const removeAvatarFromSaved = async (id: string) => {
    await invoke("avatars.remove_avatar_from_saved", id)

    if (onRemove) {
        onRemove(id);
      }
  }


  return (
    <>
      <button
        onClick={() => changeAvatar(avatar.id)}
        className={avatar.id === userData.currentAvatar ? css.applyActive : ""}
      >
        <ApplyIcon />
      </button>
      {remove ?
        <button
          onClick={() => removeAvatarFromSaved(avatar.id)}
        >
          <TrashIcon />
        </button> :
        <button
          onClick={() => addToSavedAvatars(avatar.id, avatar.name, avatar.thumbnailImageUrl)}
          className={isFavourite ? css.favActive : ""}
        >
          <FavouriteIcon />
        </button>
      }
    </>
  )
}
