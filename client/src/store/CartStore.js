import {makeAutoObservable} from "mobx";

export default class CartStore{
    constructor(){
        this._cart = [];
        this._cartDevices = [];
        this._itemsCount = 0;
        
        makeAutoObservable(this);
    }
    setCart(data){
        this._cart = data;
    }
    setItemsCount(count){
        this._itemsCount = count;
    }
    setCartDevices(devices){
        this._cartDevices = devices;
    }
    
    get cart(){
        return this._cart;
    }
    get itemsCount(){
        return this._itemsCount;
    }
    get cartDevices(){
        return this._cartDevices;
    }
    
}