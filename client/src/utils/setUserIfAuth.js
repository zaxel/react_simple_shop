import { check } from "../http/userAPI";
import { isSuperUser } from "./isSuperUser";

export const setUserIfAuth = async(user)=>{

    const userData = await check();
      user.setUser(userData);
      user.setIsAuth(true);
      user.setIsSuperUser(isSuperUser(userData.role));
}