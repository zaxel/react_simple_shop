import { makeAutoObservable } from "mobx";

export default class AboutPageStore {
    constructor() {
        this._pageId = null;
        this._pageName = 'About';
        this._pageTitle = [];
        this._pageText = [];
        this._pageCards = [];
        this._cardBlocks = [];
        this._currentCard = {};
        this._buttons = {};
        this._loading = true;
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
        this._cardBlocks = blocks;
    }
    setButtons(buttons) {
        this._buttons = buttons;
    }
    addButton(button) {
        this._buttons = {...this._buttons, [button.id]: button};
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
        this.setButtons(buttons);
        this._currentCard = card;
        this.setCardBlocks(card.info_about_blocks);
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
    get currentCard() {
        return this._currentCard;
    }
    get buttons() {
        return this._buttons;
    }
    get mainStoreFieldName() {
        return this._mainStoreFieldName;
    }
}