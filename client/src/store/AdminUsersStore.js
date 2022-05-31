import {makeAutoObservable} from "mobx";

export default class AdminUsersStore{
    
    _users = {};
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 4;
    _updateDataTrigger = false;
    constructor(){
        
        makeAutoObservable(this);
    }
    
    setUsers(users){
        this._users = users;
    }
    setSortDirection(direction){
        this._sortDirection = direction;
    }
    setSortBy(by){
        this._sortBy = by;
    }
    
    setActivePage(page){
        this._activePage = page;
    }
    setPagesTotal(number){
        this._pagesTotal = number;
    }
    setItemsPerPage(number){
        this._itemsPerPage = number;
    }
    setUpdateDataTrigger(bool){
        this._updateDataTrigger = bool;
    }
    
    get users(){
        return this._users;
    }
    get sortDirection(){
        return this._sortDirection;
    }
    get sortBy(){
        return this._sortBy;
    }
    get activePage(){
        return this._activePage;
    }
    get pagesTotal(){
        return this._pagesTotal;
    }
    get itemsPerPage(){
        return this._itemsPerPage;
    }
    get updateDataTrigger(){
        return this._updateDataTrigger;
    }
}