import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor(root){
        this._root = root;
        this._isAuth = false;
        this._isSuperUser = false;
        this._user = {};
        this._wishlist = new Set();
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
    setWishList(listArr = []){
        this._wishlist = new Set(listArr);
    }
    addWishlistItem(item){
        this._wishlist.add(item);
    }
    deleteWishlistItem(item){
        this._wishlist.delete(item);
    }
    reset(){
        this.setUser({});
        this.setIsAuth(false);
        this.setIsSuperUser(false);
        this._wishlist.clear();
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
    get wishlist(){
        return this._wishlist;
    }
}