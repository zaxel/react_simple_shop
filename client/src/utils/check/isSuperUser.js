﻿import { ADMIN, MODERATOR } from "../consts/roles";

export const isSuperUser = (role)=>{
    if(role===ADMIN || role===MODERATOR)return true;
    return false;
}