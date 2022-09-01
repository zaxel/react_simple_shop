import {makeAutoObservable} from "mobx";

export default class AboutPageStore{
    constructor(){
        this._pageId = null;
        this._pageName = 'About';
        this._pageTitle = [];
        this._pageText = [];
        this._pageCards = [];
        this._cardBlocks = [];
        this._buttons = [];


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
    setCardBlocks(blocks){
        this._cardBlocks = blocks;
    }
    setButtons(buttons){
        this._buttons = buttons;
    }
    setPage(fetchedData){

        this.setPageId(fetchedData.id);
        this.setPageName(fetchedData.name);
        this.setPageTitle(fetchedData.title);
        this.setPageText(fetchedData.text);

        this.setPageCards(fetchedData.about_app_cards);
        this.setCardBlocks(fetchedData.about_card_blocks);
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
    get cardBlocks(){
        return this._cardBlocks;
    }
    get buttons(){
        return this._buttons;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}