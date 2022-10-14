import {makeAutoObservable} from "mobx";
import { changeHelpCatPosition, deleteFaqCategory } from "../../utils/staticPages/helpPage";

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
        this._activeCatEdit = null;
        this._activeCatBody = null;
        this._questions = [];
        this._answers = [];
        this._allQuestions = [];
        this._faqRelated = [];
        this._categories = [];
        this._positions = [];
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
    setActiveCatEdit(catId){
        this._activeCatEdit = catId; 
    }
    setActiveCatBody(bodyName){
        this._activeCatBody = bodyName;
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

    setAllQuestions(data){
        this._allQuestions = data.questions;
    }
    setFaqRelated(relations){
        this._faqRelated = relations;
    }
    addRelated(relation){
        this._faqRelated.push(relation);
    }
    removeRelated(infoHelpQuestionId){
        this._faqRelated = this._faqRelated.filter(faq=> faq.infoHelpQuestionId!==infoHelpQuestionId);
    }
    setCategories(categories){

        this._categories = categories;
    }
    addCategory(category){
        this._categories.push(category);
    }
    deleteCategory(id){
        this._positions = [];
        const deletedCatPosition = this._categories.find(cat=>cat.id===id).order_id;
        console.log(deletedCatPosition)
        this._categories.forEach(category=>{ 
            if(category.order_id > deletedCatPosition) category.order_id = category.order_id - 1; 
        })
        this._categories = this._categories.filter(category=>category.id!==id);
        this._categories.forEach(el=>this._positions.push({id: el.id, order_id: el.order_id}))
        deleteFaqCategory({id, catPositions: this._positions});
    }
    updateCategory({id, link, title}){
        const fieldName = link ? 'link' : 'title'
        const data = link ? link : title;
        this._categories.find(cat=>cat.id===id)[fieldName] = data; 
    } 
    updateCategoryImg({id, imgDbCollName, fileName}){
        this._categories.find(cat=>cat.id===+id)[imgDbCollName] = fileName;
    } 
    setCatPosition(startPosition, endPosition){
        this._positions = [];
        this._categories = this._categories.map(cat => {
            const currentCatPos = {id: cat.id, order_id: cat.order_id};
            if (startPosition < endPosition) {
                if (cat.order_id === startPosition) {
                    currentCatPos.order_id = endPosition;
                    this._positions.push(currentCatPos);
                    return { ...cat, order_id: endPosition };
                } else if (cat.order_id > startPosition && cat.order_id <= endPosition) {
                    currentCatPos.order_id = cat.order_id - 1;
                    this._positions.push(currentCatPos);
                    return { ...cat, order_id: cat.order_id - 1 };
                }
            } else {
                if (cat.order_id === startPosition) {
                    currentCatPos.order_id = endPosition;
                    this._positions.push(currentCatPos);
                    return { ...cat, order_id: endPosition };
                } else if (cat.order_id < startPosition && cat.order_id >= endPosition) {
                    currentCatPos.order_id = cat.order_id + 1;
                    this._positions.push(currentCatPos);
                    return { ...cat, order_id: cat.order_id + 1 };
                }
            }
            this._positions.push(currentCatPos); 
            return cat;
        });
        changeHelpCatPosition(this._positions);
    } 


    addNewFaq({answerId, text, title, answerUpdatedAt, infoHelpAnswerId, question, questionCreatedAt, id, questionUpdatedAt, order_id, infoHelpCategoryId}){
        this._questions.push({id, order_id, question, infoHelpCategoryId, infoHelpAnswerId})
        this._answers.push({answerId, title, text})
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
    get activeCatEdit(){
        return this._activeCatEdit; 
    }
    get activeCatBody(){
        return this._activeCatBody;  
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