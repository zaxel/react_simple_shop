import {makeAutoObservable} from "mobx";

export default class CartStore{
    _cart = [];          //{id, deviceId, basketId, device_amount}
    _cartDevices = [];   //{id, brandId, createdAt, img, info, name, price, rate, typeId, updatedAt}
    _mainStoreFieldName = 'cart';
    _itemsCount = 0;
    _cartId = 0;
    _cartTotal = 0;
    constructor(){
        makeAutoObservable(this);
    }

    setCart(data){
        this._cart = data;
    }
    updateCart(devices){
        this._cart = [...this._cart, ...devices];
    }

    addDevice(basketId, deviceId, device_amount, id = 0){
        const exist = this._cart.find(el=>el.deviceId === deviceId);
        if(exist){
            exist.device_amount++;
        }else{
            this._cart.push({basketId, deviceId, device_amount, id});
        }
    }


    calcItemsCount(){
        const count = this._cart.reduce((prev, next)=>{
            return prev + next.device_amount
        },0)
        this._itemsCount = count;
    }
    setItemsCount(count){
        this._itemsCount = count;
    }
    decreaseItemsCount(){
        this._itemsCount--;
    }
    increaseItemsCount(){
        this._itemsCount++;
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
    setCartId(id){
        this._cartId = id;
    }
    setCartTotal(){
        this._cartTotal = this._cart.reduce((prev, next)=>{
            const device = this._cartDevices.find(el=>el.id===next.deviceId);
            
            return prev+device.price*next.device_amount;
        }, 0)
    }
    clearCart(){
        this._cart = [];          
        this._cartDevices = [];   
        this._itemsCount = 0;
        this._cartTotal = 0;
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
    get cartId(){
        return this._cartId;
    }
    get cartTotal(){
        return this._cartTotal;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}