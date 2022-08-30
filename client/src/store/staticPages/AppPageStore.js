import {makeAutoObservable} from "mobx";

export default class AppPageStore{
    constructor(){
        this._pageId = null;
        this._pageName = 'App';
        this._pageTitle = [];
        this._pageText = [];
        this._pageCards = [];
        this._loading = true;
        this._mainStoreFieldName = 'pageCards';
        makeAutoObservable(this);
    }
    
    setPageId(id){
        this._pageId = id;
    }
    setPageName(name){
        this._pageName = name;
    }
    setPageTitle(titlesArr){
        this._pageTitle = titlesArr;
    }
    setPageText(textsArr){
        this._pageText = textsArr;
    }
    setLoading(bool){
        this._loading = bool;
    }
    setPageCards(cards){
        this._pageCards = cards;
    }
    setPage(fetchedData){

        this.setPageId(fetchedData.id);
        this.setPageName(fetchedData.name);
        this.setPageTitle(fetchedData.title);
        this.setPageText(fetchedData.text);
        this.setPageCards(fetchedData.info_app_cards);
    }

    get pageId(){
        return this._pageId;
    }
    get pageName(){
        return this._pageName;
    }
    get pageTitle(){
        return this._pageTitle;
    }
    get pageText(){
        return this._pageText;
    }
    get loading(){
        return this._loading;
    }
    get pageCards(){
        return this._pageCards;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}