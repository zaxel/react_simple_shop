import {makeAutoObservable} from "mobx";

export default class CartStore{
    constructor(){
        this._cart = {};
        this._itemsCount = 0;
        
        makeAutoObservable(this);
    }
    setCart(data){
        this._cart = data;
    }
    setItemsCount(count){
        this._itemsCount = count;
    }
    
    get cart(){
        return this._cart;
    }
    get itemsCount(){
        return this._itemsCount;
    }
    
}