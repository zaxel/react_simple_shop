﻿import {makeAutoObservable} from "mobx";

export default class HelpPageStore{
    constructor(){
        this._pageId = null;
        this._pageName = 'Help';
        this._loading = true;
        this._pageTitle = '';
        this._pageImg = '';
        this._contactTitle = '';
        this._contactBgImages = ['', ''];


        this._activeFaqEdit = null;
        this._questions = [
            {id: 1, order_id: 1, question: 'what is your name?', infoHelpCategoryId: 1, infoHelpAnswerId: 1},
            {id: 2, order_id: 2, question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of ', infoHelpCategoryId: 1, infoHelpAnswerId: 2},
            {id: 3, order_id: 3, question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley ofLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of', infoHelpCategoryId: 1, infoHelpAnswerId: 3},
            {id: 4, order_id: 4, question: 'what is your address?', infoHelpCategoryId: 1, infoHelpAnswerId: 4},
        ];
        this._answers = [
            {id: 1, title: 'my name is Bob', text: 'this is the best name in the world.'},
            {id: 2, title: 'my last name is Dellan', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'},
            {id: 3, title: 'my garage', text: 'currently driving bicycle'},
            {id: 4, title: 'privet info', text: 'unfortunately I will not be able to tell you this.'},
        ];
        
        makeAutoObservable(this);
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
    setContactTitle(title){
        this._contactTitle = title;
    }
    setLoading(bool){
        this._loading = bool;
    }
    setPageImg(img){
        this._pageImg = img;
    }
    
    setContactLargeImg(img){
        this._contactBgImages[0] = img;
    }
    setContactSmallImg(img){
        this._contactBgImages[1] = img;
    }
    setPage(fetchedData){
        console.log(fetchedData)
        fetchedData.id && this.setPageId(fetchedData.id);
        fetchedData.name && this.setPageName(fetchedData.name);
        fetchedData?.title?.[0] && this.setPageTitle(fetchedData.title[0]);
        fetchedData?.title?.[1] && this.setContactTitle(fetchedData.title[1]);
        fetchedData?.img?.[0] && this.setPageImg(fetchedData.img[0]);
        fetchedData?.img?.[1] && this.setContactLargeImg(fetchedData.img[1]);
        fetchedData?.img?.[2] && this.setContactSmallImg(fetchedData.img[2]);
        console.log(this._pageTitle, this._contactTitle)
    }



    setActiveFaqEdit(faqId){
        this._activeFaqEdit = faqId;
    }
    setQuestions(questions){
        this._questions = questions;
    }
    setAnswers(answers){
        this._answers = answers;
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
    get contactBgImages(){
        return this._contactBgImages;
    }
    get activeFaqEdit(){
        return this._activeFaqEdit;
    }
    get questions(){
        return this._questions;
    }
    get answers(){
        return this._answers;
    }
}