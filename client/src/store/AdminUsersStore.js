import {makeAutoObservable} from "mobx";

export default class AdminUsersStore{
    
    _users = {};
    _sortBy = 'id';
    _sortRevers = false;
    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 4;
    constructor(){
        
        makeAutoObservable(this);
    }
    
    setUsers(users){
        this._users = users;
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
    
    get users(){
        return this._users;
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
}