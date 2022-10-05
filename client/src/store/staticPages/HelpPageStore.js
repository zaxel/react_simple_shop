import {makeAutoObservable} from "mobx";

export default class HelpPageStore{
    constructor(){
        this._pageName = 'Help';
        
        makeAutoObservable(this);
    }
    
    
}