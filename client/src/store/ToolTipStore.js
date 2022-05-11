import {makeAutoObservable} from "mobx";

export default class ToolTipStore{
    _isToolTipShown = true;
    _toolTipText = 'some help tooltips';
    _top = 0;
    _left = 0;
    _offsetWidth = 0;
    _offsetHeight = 0;
    constructor(){
        makeAutoObservable(this);
    }

    setIsToolTipShown(condition){
        this._isToolTipShown = condition;
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
    setOffsetWidth(width){
        this._offsetWidth = width;
    }
    setOffsetHeight(height){
        this._offsetHeight = height;
    }
    
    get isToolTipShown(){
        return this._isToolTipShown;
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
    get offsetWidth(){
        return this._offsetWidth;
    }
    get offsetHeight(){
        return this._offsetHeight;
    }
    
}