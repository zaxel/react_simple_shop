import {makeAutoObservable} from "mobx";

export default class AdminUserOrdersStore{
    
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _loading = false;
    _userOrders = {};
    _userId = null;
    _updateDataTrigger = false;

    constructor(){
        makeAutoObservable(this);
    }
    setUserOrders(orders){
        this._userOrders = orders;
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
    setUserId(userId){
        this._userId = userId;
    }
    setUpdateDataTrigger(bool){
        this._updateDataTrigger = bool;
    }
    
    get userOrders(){
        return this._userOrders;
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
    get userId(){
        return this._userId;
    }
    get updateDataTrigger(){
        return this._updateDataTrigger;
    }
}