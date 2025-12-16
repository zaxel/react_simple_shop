import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor(){
        this._isAuth = false;
        this._isSuperUser = false;
        this._user = {};
        this._mainStoreFieldName = 'user';
        makeAutoObservable(this);
    }
    setIsAuth(bool){
        this._isAuth = bool;
    }
    setIsSuperUser(bool){
        this._isSuperUser = bool;
    }
    setUser(user){
        this._user = user;
    }
    updateUser(data){
        this._user = {...this._user, ...data};
    }
    get isAuth(){
        return this._isAuth;
    }
    get isSuperUser(){
        return this._isSuperUser;
    }
    get user(){
        return this._user;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}