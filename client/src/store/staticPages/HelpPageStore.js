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
        this._questions = [];

        this._faqsPage = 1;
        this._totalFaqs = 0;

        this._faqPopular = [];

        this._faqQuestion = '';
        this._faqAnswer = '';
        this._faqRelated = [];
        this._faqCategory = {};
        this._infoHelpCategoryId = null;
        
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
    setQuestions({questions, count}){
        this._totalFaqs = count;
        this._questions = [...this._questions, ...questions]; 
    }
    resetQuestions(){
        this._totalFaqs = 0;
        this._faqsPage = 1; 
        this._questions = []; 
    }
    setFaqsPage(pageNumber){
        this._faqsPage = pageNumber;
    }
    setTotalFaqs(totalNumber){
        this._totalFaqs = totalNumber;
    }
    setFaqPopular({popular}){
        this._faqPopular = popular;
    }
    setFaqCategory(category){
        this._faqCategory = category;
    }
    setFaq(faq){
        this._faqQuestion = faq.question.question;
        this._faqAnswer = faq.answer.text;
        this._faqRelated = faq.relatedFaqs;
        this._infoHelpCategoryId = faq.question.infoHelpCategoryId;
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
    get questions(){
        return this._questions;
    }
    get faqsPage(){
        return this._faqsPage; 
    }
    get totalFaqs(){
        return this._totalFaqs; 
    } 
    get faqPopular(){
        return this._faqPopular; 
    } 
    get faqQuestion(){
        return this._faqQuestion; 
    } 
    get faqAnswer(){
        return this._faqAnswer; 
    } 
    get faqRelated(){
        return this._faqRelated; 
    } 
    get faqCategoryId(){
        return this._infoHelpCategoryId; 
    } 
    get faqCategory(){
        return this._faqCategory; 
    } 
   
}