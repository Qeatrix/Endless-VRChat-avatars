import { useContext } from "react";
import css from "./Sidebar.module.less";
import { UserContext } from "@/contexts";
import { Catalog } from "@/types";
import { SettingsIcon } from "../../assets/SettingsIcon";
import { UploadCloudIcon } from "../../assets/UploadCloudIcon";
import { CoinsHandIcon } from "../../assets/CoinsHandIcon";

export const Sidebar = ({ catalog, setCatalog }) => {
  const { userData, updateCurrentAvatar } = useContext(UserContext);

  const changeCatalog = (type: Catalog) => {
    setCatalog(type);
  }

  return (
    <div className={css.Container}>
      <div className={css.previewContainer}>
        <div className={css.Avatar}>
          <img src={userData.currentAvatarImageUrl} alt="" />
          <div className={css.DetailsContainer}>
            <p>{userData.currentAvatarName}</p>
          </div>
        </div>
      </div>
      <div className={css.Sections}>
        <button
          className={`${catalog === Catalog.SAVED ? css.Selected : ""} btn`}
          onClick={() => changeCatalog(Catalog.SAVED)}
        >
          Saved
        </button>
        <button
          className={`${catalog === Catalog.INGAME ? css.Selected : ""} btn`}
          onClick={() => changeCatalog(Catalog.INGAME)}
        >
          In-Game
        </button>
        <button
          className={`${catalog === Catalog.SEARCH ? css.Selected : ""} btn`}
          onClick={() => changeCatalog(Catalog.SEARCH)}
        >
          Search
        </button>
      </div>
      <div className={css.bottomButtons}>
        <button
          className={`${catalog === Catalog.SETTINGS ? css.Selected : ""} btn`}
          onClick={() => changeCatalog(Catalog.SETTINGS)}
        >
          <SettingsIcon />
        </button>
        <button
          className={`${catalog === Catalog.UPLOAD ? css.Selected : ""} btn`}
          onClick={() => changeCatalog(Catalog.UPLOAD)}
        >
          <UploadCloudIcon />
        </button>
        <button
          className={`${catalog === Catalog.DONATION ? css.Selected : ""} btn`}
          onClick={() => changeCatalog(Catalog.DONATION)}
        >
          <CoinsHandIcon />
        </button>
      </div>
    </div>
  )
}
