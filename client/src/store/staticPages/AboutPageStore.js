import { makeAutoObservable } from "mobx";

export default class AboutPageStore {
    constructor() {
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
    setPage({page, buttons}) {
        this.setPageId(page.id);
        this.setPageName(page.name);
        this.setPageTitle(page.title);
        this.setPageText(page.text);

        this.setPageCards(page.info_about_cards.map(card => {
            const keysNoCards = Object.keys(card).filter(el => el !== 'info_about_blocks');
            return keysNoCards.reduce((obj, key) => {
                return { ...obj, [key]: card[key] }
            }, {})
        }));

        this.setCardBlocks((() => {
            const uniqId = new Set();
            const uniqBlocks = [];
            page.info_about_cards.map(card => {
                return card.info_about_blocks
            }).forEach(el => {
                el.forEach(elem => {
                    if (!uniqId.has(elem.id)) {
                        uniqBlocks.push(elem);
                    };
                    uniqId.add(elem.id);
                })
            })
            return uniqBlocks;
        })());
        this.setButtons(buttons);
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
    get buttons() {
        return this._buttons;
    }
    get mainStoreFieldName() {
        return this._mainStoreFieldName;
    }
}