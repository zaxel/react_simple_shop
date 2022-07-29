import {makeAutoObservable} from "mobx";

export default class AdminOrderDetailsStore{
    
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _loading = true;
    _orderDetails = {};

    constructor(){
        makeAutoObservable(this);
    }
    setOrderDetails(order){
        this._info = order;
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
}