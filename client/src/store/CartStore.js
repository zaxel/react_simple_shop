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