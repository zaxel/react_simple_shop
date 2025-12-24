import {makeAutoObservable} from "mobx";

export default class HistoryStore{
    constructor(){
        this._lastPath = "/";
        this._pendingWish = null;
        makeAutoObservable(this);
    }
    
    get pendingWish(){
        return this._pendingWish;
    }
    get lastPath(){
        return this._lastPath;
    }
   
    setPendingWish(deviceId){
        this._pendingWish = deviceId;
    }
    clearPendingWish() {
        this._pendingWish = null;  
    }
    setLastPath(path) {
        this._lastPath = path;   
    }
}