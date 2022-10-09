import {makeAutoObservable} from "mobx";

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
        this._questions = [];
        this._answers = [];
        this._allQuestions = [
            {id: 1, infoHelpCategoryId: 2, question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of', updatedAt: 44577845477},
            {id: 2, infoHelpCategoryId: 1, question: 'who are you1?', updatedAt: 44577845477},
            {id: 3, infoHelpCategoryId: 1, question: 'who are you2?', updatedAt: 44577845477},
        ]
        this._faqRelated = [
            {id: 1, faq_id: 1, related_id: 2},
            {id: 2, faq_id: 1, related_id: 3},
            {id: 3, faq_id: 1, related_id: 4},
            {id: 4, faq_id: 3, related_id: 1},
            {id: 5, faq_id: 3, related_id: 2},
        ]
        this._categories = [
            {id:1, order_id: 1, title: 'delivery', banner: 'dkka.jpg', icon: 'someicon.png', link: 'http://www.google.com'},
            {id:2, order_id: 2, title: 'payments', banner: 'dkka.jpg', icon: 'someicon.png', link: 'http://www.google.com'},
            {id:3, order_id: 3, title: 'order issues', banner: 'dkka.jpg', icon: 'someicon.png', link: 'http://www.google.com'},
        ]
        this._modalFaqLoading = false;

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
        fetchedData.id && this.setPageId(fetchedData.id);
        fetchedData.name && this.setPageName(fetchedData.name);
        fetchedData?.title?.[0] && this.setPageTitle(fetchedData.title[0]);
        fetchedData?.title?.[1] && this.setContactTitle(fetchedData.title[1]);
        fetchedData?.img?.[0] && this.setPageImg(fetchedData.img[0]);
        fetchedData?.img?.[1] && this.setContactLargeImg(fetchedData.img[1]);
        fetchedData?.img?.[2] && this.setContactSmallImg(fetchedData.img[2]);
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
    setModalFaqLoading(bool){
        this._modalFaqLoading = bool;
    }

    setFaqRelated(relations){
        this._faqRelated = relations;
    }
    setCategories(categories){
        this._categories = categories;
    }



    addNewFaq({answerId, text, title, answerUpdatedAt, questionAnswerId, question, questionCreatedAt, id, questionUpdatedAt, questionOrderId, questionCategoryId}){
        this._questions.push({id, order_id: questionOrderId, question, infoHelpCategoryId: questionCategoryId, infoHelpAnswerId: questionAnswerId})
        this._answers.push({id: answerId, title, text})
    }
    setAllFaqs({answers, questions}){
        this._answers = answers;
        this._questions = questions;
    }
    updateQuestion({id, data}){
        this._questions.find(quest=>quest.id === id).question = data; 
    }
    updateAnswer({id, text, title}){
        const field = text ? 'text' : 'title';
        const data = text ?? title;
        this._answers.find(answer=>answer.answerId === id)[field] = data;
    }
    deleteFaq(id){
        this._questions = this._questions.filter(question=>question.infoHelpAnswerId !== id);
        this._answers = this._answers.filter(answer=>answer.answerId !== id);
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
    get modalFaqLoading(){
        return this._modalFaqLoading;
    }


    get allQuestions(){
        return this._allQuestions;
    }
    get faqRelated(){
        return this._faqRelated;
    }
    get categories(){
        return this._categories;
    }
}