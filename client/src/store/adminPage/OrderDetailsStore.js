import {makeObservable, observable, action} from "mobx";
import BaseStore from "./BaseStore";

export default class OrderDetailsStore extends BaseStore{
    
    _orderDetails = {};
    _mainStoreFieldName = 'orderDetails';

    _orderId = null;

    constructor(){
        super();
        makeObservable(this, {
            _orderDetails: observable,
            _mainStoreFieldName: observable,
            _orderId: observable,
            
            setOrderDetails: action,
            setOrderId: action,
        })
    }
    setOrderDetails(order){
        this._orderDetails = order;
    }
    setOrderId(orderId){
        this._orderId = orderId;
    }
    
    get orderDetails(){
        return this._orderDetails;
    }
    get orderId(){
        return this._orderId;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}