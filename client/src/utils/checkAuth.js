import { check } from "../http/userAPI";

export const checkAuth = async()=>{
    try{
      const user = await check();
      return user;
    }catch(err){
      throw new Error(err);
    }
}