﻿import {makeAutoObservable} from "mobx";

export default class HistoryStore{
    constructor(){
        this._authFrom = '';
        
        makeAutoObservable(this);
    }
    setAuthFrom(path){
        this._authFrom = path;
    }
    get authFrom(){
        return this._authFrom;
    }
}