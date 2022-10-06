import {makeAutoObservable} from "mobx";

export default class HelpPageStore{
    constructor(){
        this._pageId = null;
        this._pageName = 'Help';
        this._loading = true;
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
    setLoading(bool){
        this._loading = bool;
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
    setPage(fetchedData){

        this.setPageId(fetchedData.id);
        // this.setPageName(fetchedData.name);
        // this.setPageTitle(fetchedData.title);
        // this.setPageText(fetchedData.text);
        // this.setPageCards(fetchedData.info_app_cards);
    }

    get pageId(){
        return this._pageId;
    }
    get pageTitle(){
        return this._pageTitle;
    }
    get loading(){
        return this._loading;
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