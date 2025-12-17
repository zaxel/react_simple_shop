import { isSuperUser } from "./check/isSuperUser";

export const setUserData = async (userStore, user) => {
  userStore.setUser(user);
  userStore.setIsAuth(true);
  userStore.setIsSuperUser(isSuperUser(user.role));
}