import { check } from "../http/userAPI";
import { isSuperUser } from "./check/isSuperUser";

export const setUserIfAuth = async(userStore)=>{

    const user = await check();
      userStore.setUser(user);
      userStore.setIsAuth(true);
      userStore.setIsSuperUser(isSuperUser(user.role));
}