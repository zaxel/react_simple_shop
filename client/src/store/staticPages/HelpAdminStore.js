import {makeAutoObservable} from "mobx";

export default class HelpPageStore{
    constructor(){
        this._pageId = null;
        this._pageName = 'Help';
        this._pageTitles = '';
        this._pageImg = '';
        this._contactTitle = '';
        this._contactBgImages = [];
        
        makeAutoObservable(this);
    }
    
    setPageId(id){
        this._pageId = id;
    }
    setPageTitle(title){
        this._pageTitle = title;
    }
    setPageImg(img){
        this._pageImg = img;
    }
    setContactBgImages(imgArr){
        this._contactBgImages = imgArr;
    }
    setContactLargeImg(img){
        this._contactBgImages[0] = img;
    }
    setContactSmallImg(img){
        this._contactBgImages[1] = img;
    }

    get pageId(){
        return this._pageId;
    }
    get pageTitle(){
        return this._pageTitle;
    }
    get pageImg(){
        return this._pageImg;
    }
    get pageName(){
        return this._pageName;
    }
    get contactTitle(){
        return this._contactTitle;
    }
}