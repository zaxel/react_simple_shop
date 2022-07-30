import {makeAutoObservable} from "mobx";

export default class AdminOrderDetailsStore{
    
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _loading = false;
    _orderDetails = {};
    _orderId = null;
    _updateDataTrigger = false;

    constructor(){
        makeAutoObservable(this);
    }
    setOrderDetails(order){
        this._orderDetails = order;
    }
    setSortDirection(direction){
        this._sortDirection = direction;
    }
    setSortBy(by){
        this._sortBy = by;
    }
    setLoading(bool){
        this._loading = bool;
    }
    setOrderId(orderId){
        this._orderId = orderId;
    }
    setUpdateDataTrigger(bool){
        this._updateDataTrigger = bool;
    }
    
    get orderDetails(){
        return this._orderDetails;
    }
    get sortDirection(){
        return this._sortDirection;
    }
    get sortBy(){
        return this._sortBy;
    }
    get loading(){
        return this._loading;
    }
    get orderId(){
        return this._orderId;
    }
    get updateDataTrigger(){
        return this._updateDataTrigger;
    }
}