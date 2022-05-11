import {makeAutoObservable} from "mobx";

export default class ToolTipStore{
    _isToolTipShown = false;
    _toolTipText = 'test text';
    constructor(){
        makeAutoObservable(this);
    }

    setIsToolTipShown(condition){
        this._isToolTipShown = condition;
    }
    setToolTipText(text){
        this._toolTipText = text;
    }
    get isToolTipShown(){
        return this._isToolTipShown;
    }
    get toolTipText(){
        return this._toolTipText;
    }
}