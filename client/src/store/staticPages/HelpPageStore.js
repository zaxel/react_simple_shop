import {makeAutoObservable} from "mobx";

export default class HelpPageStore{
    constructor(){
        this._loading = false;
        this._pageName = 'Help';
        this._pageId = null;
        this._pageTitle = '';
        this._pageHero = null;
        this._contactTitle = '';
        this._contactHero = null;

        this._categories = [];
        this._starterQuestions = [];
        
        makeAutoObservable(this);
    }
    
    setLoading(bool){
        this._loading = bool;
    }
    setPageId(id){
        this._pageId = id;
    }
    setPageName(name){
        this._pageName = name;
    }
    setPageTitle(title){
        this._pageTitle = title;
    }
    setPageHero(src){
        this._pageHero = src;
    }
    setContactTitle(title){
        this._contactTitle = title;
    }
    setContactHero(src){
        this._contactHero = src;
    }
    setPage({id, name, title, img}){
        this.setPageId(id);
        this.setPageName(name);
        this.setPageTitle(title[0]);
        this.setPageHero(img[0]);
        this.setContactTitle(title[1]);
        this.setContactHero(img[1]);
    }

    
    setCategories(cat){
        this._categories = cat;
    }
    setStarterQuestions({questions}){
        this._starterQuestions = questions;
    }



    get loading(){
        return this._loading;
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
    get pageHero(){
        return this._pageHero;
    }
    get contactTitle(){
        return this._contactTitle;
    }
    get contactHero(){
        return this._contactHero;
    }
    
    
    
    get categories(){
        return this._categories;
    }
    get starterQuestions(){
        return this._starterQuestions;
    }
   
}