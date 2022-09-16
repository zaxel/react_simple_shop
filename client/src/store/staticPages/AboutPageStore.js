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
        this._buttonsModal = {};
        this._loading = false;
        this._modalBtnsLoading = false;
        this._activeBlockEdit = null;
        this._activeCardEdit = null;
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
    setModalBtnsLoading(bool) {
        this._modalBtnsLoading = bool;
    }
    setPageCards(cards) {
        this._pageCards = cards;
    }
    setCardBlocks(blocks) {
        this._cardBlocks = blocks;
    }
    setCardBlockPosition(startPosition, endPosition) {
        this._cardBlocks.map(el => console.log(el.position))
        console.log('startPosition: ' + startPosition + ', endPosition: ' + endPosition)
        this._cardBlocks = this._cardBlocks.map(block => {
            if (startPosition < endPosition) {
                if (block.position === startPosition) {
                    return { ...block, position: endPosition };
                } else if (block.position > startPosition && block.position <= endPosition) {
                    return { ...block, position: block.position - 1 };
                }
            } else {
                if (block.position === startPosition) {
                    return { ...block, position: endPosition };
                } else if (block.position < startPosition && block.position >= endPosition) {
                    return { ...block, position: block.position + 1 };
                }
            }
            return block;
        });
        // this._cardBlocks = this._cardBlocks.map(block=>block.position === endPosition ? {...block, position: startPosition} : block);
        this._cardBlocks.map(el => console.log(el.id, el.position))
    }
    setButtons(buttons) {
        this._buttons = buttons;
    }
    setButtonsModal(buttons) {
        this._buttonsModal = buttons;
    }
    setActiveBlockEdit(blockId) {
        this._activeBlockEdit = blockId;
    }
    setActiveCardEdit(cardId) {
        this._activeCardEdit = cardId;
    }
    addButton(button) {
        this._buttons = { ...this._buttons, [button.id]: button };
    }
    deleteButton(id) {
        const btnsKeys = Object.keys(this._buttons);
        const newBtns = {};
        btnsKeys.filter(el => el !== id).forEach(btnId => {
            newBtns[btnId] = { ...this._buttons[btnId] }
        })
        this._buttons = newBtns;
    }
    setPage({ page, buttons }) {
        this.setButtons(buttons);
        this.setPageId(page.id);
        this.setPageName(page.name);
        this.setPageTitle(page.title);
        this.setPageText(page.text);
        this.setPageCards(page.info_about_cards);
    }
    setCurrentCard({ card, buttons }) {
        this.setButtons(buttons);
        this._currentCard = card;
        this.setCardBlocks(card.info_about_blocks);
    }
    setEditBlocks(blocks) {
        this._editBlocks = blocks;
    }
    setEditBlockCardIdAndPos(id, position) {
        let elem = this._editBlocks.find(el => el.block.id === id).block;
        elem.infoAboutCardId = this._activeCardEdit;
        elem.position = position;
        this._cardBlocks.push(elem);
    }
    removeEditBlockCardIdAndPos(id) {
        let elem = this._editBlocks.find(el => el.block.id === id).block;
        elem.infoAboutCardId = null;
        elem.position = null; 
        this._cardBlocks = this._cardBlocks.filter(el => el.id !== id);
    }
    addEditBlocks(blocks) {
        this._editBlocks.push(blocks);
    }
    deleteBlock(id) {
        this._editBlocks = this._editBlocks.filter(block => block.block.id !== id);
    }
    editEditBlocksBtns(btns) {
        this._editBlocks.find(el => el.block.id === this._activeBlockEdit).buttons = btns;
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
    get modalBtnsLoading() {
        return this._modalBtnsLoading;
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
    get activeCardEdit() {
        return this._activeCardEdit;
    }
    get buttons() {
        return this._buttons;
    }
    get buttonsModal() {
        return this._buttonsModal;
    }
    get mainStoreFieldName() {
        return this._mainStoreFieldName;
    }
}