import {makeAutoObservable} from "mobx";

export default class HistoryStore{
    constructor(){
        this._authFrom = '';
        this._pendingWish = null;
        makeAutoObservable(this);
    }
    get authFrom(){
        return this._authFrom;
    }
    get pendingWish(){
        return this._pendingWish;
    }
    setAuthFrom(path){
        this._authFrom = path;
    }
    setPendingWish(deviceId){
        this._pendingWish = deviceId;
    }
    clearPendingWish() {
        this._pendingWish = null;  
    }
}