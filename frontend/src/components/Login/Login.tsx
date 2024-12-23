import { useState } from "react";
import { encodeCredentials } from "@/utils/encoder"
import { LoginResponse } from "@/types";
import { invoke } from "@/api";

import css from './Login.module.less';
import { NextArrow } from "../../assets/NextArrow";


export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authCookie, setAuthCookie] = useState("");
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    if (twoFactorRequired) {
      const payload = {
        code: twoFactorCode,
        auth_cookie: authCookie,
        tfa_method: twoFactorMethod
      }

      const verify = await invoke("auth.verify_two_factor", payload)
      const completeCookie = `${verify}; ${authCookie}`
      if (completeCookie.length > 300) {
        await invoke("auth.set_two_factor_cookie", completeCookie)
        location.reload()

        return
      }
    }

    const authString = encodeCredentials(login, password)
    const loginRespose: LoginResponse = await invoke("auth.login", authString)
    console.log(loginRespose);

    if (loginRespose.cookie) {
      setAuthCookie(loginRespose.cookie)
    }

    if (loginRespose.twoFactorAuthMethod) {
      setTwoFactorMethod(loginRespose.twoFactorAuthMethod);
      setTwoFactorRequired(true);
    }
  }

  return (
    <>
      <div className={css["login-wrapper"]}>
        <div className={css["login-container"]}>
          <h2>Login</h2>
          <div className={css["input-field"]}>
            <input
              type="text"
              placeholder="Login"
              value={login}
              className="input"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className={css["input-field"]}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {twoFactorRequired &&
            <div className={css["input-field"]}>
              <input
                type="text"
                placeholder="two factor code"
                value={twoFactorCode}
                className="input"
                onChange={(e) => setTwoFactorCode(e.target.value)}
              />
            </div>
          }
          <button className="btn login-button" onClick={handleLogin}>
            <NextArrow />
          </button>
        </div>
      </div>
    </>
  )
}
