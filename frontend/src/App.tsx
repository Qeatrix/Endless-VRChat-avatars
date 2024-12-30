import { Preloader } from "./components/Preloader";
import { WindowFrame } from "./components/WindowFrame";
import { useEffect, useState } from "react";
import { invoke } from "./api";
import { Main } from "./components/Main";
import { Login } from "./components/Login";

import './app.css';
import { UserContext } from "@/contexts";


export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null);

  const checkAuth = async () => {
    const result = await invoke('auth.get_user_info');
    console.log('userInfo', result.userInfo)

    setUserData(result.userInfo);
    setAuthenticated(result.auth)
    setLoading(false);
  };

  const updateCurrentAvatar = (avtr: string, name: string, imgUrl: string) => {
    setUserData((prev) => ({
      ...prev,
      currentAvatar: avtr,
      currentAvatarName: name,
      currentAvatarImageUrl: imgUrl
    }));
  };


  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <>
      <WindowFrame />
      <UserContext.Provider value={{ userData, updateCurrentAvatar }} >
        <div className="app-content">
          {loading ? <Preloader /> : authenticated ? <Main /> : <Login />}
        </div>
      </UserContext.Provider>
    </>
  );
};
