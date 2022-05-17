import {makeAutoObservable} from "mobx";

export default class ToolTipStore{
    _isToolTipShown = false;
    _isAvailable = true;
    _toolTipText = '';
    _top = 0;
    _left = 0;
    _hoverIntentDestroy = {};
    constructor(){
        makeAutoObservable(this);
    }

    setIsToolTipShown(condition){
        this._isToolTipShown = condition;
    }
    setIsAvailable(condition){
        this._isAvailable = condition;
    }
    setToolTipText(text){
        this._toolTipText = text;
    }
    setTop(coordY){
        this._top = coordY;
    }
    setLeft(coordX){
        this._left = coordX;
    }
    setHoverIntentDestroy(f){
        this._hoverIntentDestroy = f;
    }
    
    get isToolTipShown(){
        return this._isToolTipShown;
    }
    get isAvailable(){
        return this._isAvailable;
    }
    get toolTipText(){
        return this._toolTipText;
    }
    get top(){
        return this._top;
    }
    get left(){
        return this._left;
    }
    get hoverIntentDestroy(){
        return this._hoverIntentDestroy;
    }
    
}