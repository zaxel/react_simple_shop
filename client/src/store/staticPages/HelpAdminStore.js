import {makeAutoObservable} from "mobx";

export default class HelpPageStore{
    constructor(){
        this._pageId = null;
        this._pageName = 'Help';
        this._pageTitle = [];
        this._pageImg = [];
        
        makeAutoObservable(this);
    }
    
    setPageId(id){
        this._pageId = id;
    }
    setPageTitle(title){
        this._pageTitle[0] = title;
    }
    setPageImg(img){
        this._pageImg[0] = img;
    }

    get pageId(){
        return this._pageId;
    }
    get pageTitle(){
        return this._pageTitle[0];
    }
    get pageImg(){
        return this._pageImg[0];
    }
    get pageName(){
        return this._pageName;
    }
}