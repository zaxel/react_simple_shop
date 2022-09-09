import { makeAutoObservable } from "mobx";

export default class AboutPageStore {
    constructor() {
        this._pageId = null;
        this._pageName = 'About';
        this._pageTitle = [];
        this._pageText = [];
        this._pageCards = [];
        this._cardBlocks = [];
        this._editBlocks = [];
        this._currentCard = {};
        this._buttons = {};
        this._loading = false;
        this._activeBlockEdit = null;
        this._mainStoreFieldName = 'pageCards';
        makeAutoObservable(this);
    }

    setPageId(id) {
        this._pageId = id;
    }
    setPageName(name) {
        this._pageName = name;
    }
    setPageTitle(titlesArr) {
        this._pageTitle = titlesArr;
    }
    setPageText(textsArr) {
        this._pageText = textsArr;
    }
    setLoading(bool) {
        this._loading = bool;
    }
    setPageCards(cards) {
        this._pageCards = cards;
    }
    setCardBlocks(blocks) {
        console.log(33, blocks)
        this._cardBlocks = blocks;
    }
    setButtons(buttons) {
        this._buttons = buttons;
    }
    setActiveBlockEdit(blockId) {
        this._activeBlockEdit = blockId;
    }
    addButton(button) {
        this._buttons = {...this._buttons, [button.id]: button};
    }
    deleteButton(id) {
        const btnsKeys = Object.keys(this._buttons);
        const newBtns = {};
        btnsKeys.filter(el=>el!==id).forEach(btnId=>{
            newBtns[btnId] = {...this._buttons[btnId]}
        }) 
        this._buttons = newBtns;
    }
    setPage({page, buttons}) {
        this.setButtons(buttons);
        this.setPageId(page.id);
        this.setPageName(page.name);
        this.setPageTitle(page.title);
        this.setPageText(page.text);
        this.setPageCards(page.info_about_cards);
    }
    setCurrentCard({card, buttons}) {
        console.log(55, card.info_about_blocks)
        this.setButtons(buttons);
        this._currentCard = card;
        this.setCardBlocks(card.info_about_blocks);
    }
    setEditBlocks(blocks) {
        this._editBlocks = blocks;
        console.log(66, blocks)
        // this.setButtons(buttons);
        // this._currentCard = card;
        // this.setCardBlocks(card.info_about_blocks);
    }

    get pageId() {
        return this._pageId;
    }
    get pageName() {
        return this._pageName;
    }
    get pageTitle() {
        return this._pageTitle;
    }
    get pageText() {
        return this._pageText;
    }
    get loading() {
        return this._loading;
    }
    get pageCards() {
        return this._pageCards;
    }
    get cardBlocks() {
        return this._cardBlocks;
    }
    get editBlocks() {
        return this._editBlocks;
    }
    get currentCard() {
        return this._currentCard;
    }
    get activeBlockEdit() {
        return this._activeBlockEdit;
    }
    get buttons() {
        return this._buttons;
    }
    get mainStoreFieldName() {
        return this._mainStoreFieldName;
    }
}