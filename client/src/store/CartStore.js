import {makeAutoObservable} from "mobx";

export default class CartStore{
    _cart = [];
    _cartDevices = [];
    _itemsCount = 0;
    constructor(){
        makeAutoObservable(this);
    }
    setCart(data){
        this._cart = data;
    }
    setItemsCount(count){
        this._itemsCount = count;
    }
    decreaseItemsCount(){
        this._itemsCount--;
    }
    setCartDevices(devices){
        this._cartDevices = devices;
    }
    setDeviceAmount(amount, deviceId){
        // this._cart.map(el=>{
        //     console.log('basketId: '+el.basketId)
        //     console.log('deviceId: '+el.deviceId)
        //     console.log('device_amount: '+ el.device_amount)
        //     console.log('------------------')
        // })
        this._cart = this._cart.map(el=>{
            return el.deviceId===deviceId 
            ? {basketId: el.basketId, deviceId: el.deviceId, device_amount: amount}
            : el
        });
    }
    deleteCart(deviceId){
        this._cart = this._cart.filter(el=>el.deviceId!==deviceId);
    }
    deleteCartDevices(deviceId){
        this._cartDevices = this._cartDevices.filter(el=>el.id!==deviceId);
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