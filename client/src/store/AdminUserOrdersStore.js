import {makeAutoObservable} from "mobx";

export default class AdminUserOrdersStore{
    
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _loading = false;
    _userOrders = {};
    _updateDataTrigger = false;
    _searchBy = 'userId';
    _searchByPrase = '';
    _mainStoreFieldName = 'userOrders';
    _itemsPerPage = 100;

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
    setUpdateDataTrigger(bool){
        this._updateDataTrigger = bool;
    }
    setSearchByPrase(userId){
        this._searchByPrase = userId;
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
    get updateDataTrigger(){
        return this._updateDataTrigger;
    }
    get searchByPrase(){
        return this._searchByPrase;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
    get searchBy(){
        return this._searchBy;
    }
    get itemsPerPage(){
        return this._itemsPerPage;
    }
}