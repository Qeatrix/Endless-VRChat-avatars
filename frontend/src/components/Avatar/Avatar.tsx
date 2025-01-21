import { AvatarButtons } from "../avatarButtons";
import { Avatar } from "@/types";
import css from "./Avatar.module.less";

type AvatarProps = {
  avatar: Avatar
}

export const AvatarElement = (props: AvatarProps) => {
  const avatar = props.avatar;

  return (
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
  )
}
