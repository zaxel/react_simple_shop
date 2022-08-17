import {makeObservable, observable, action} from "mobx";
import BaseWithSearchStore from "./BaseWithSearchStore";

export default class UsersStore extends BaseWithSearchStore{
    
    _users = {};
    _mainStoreFieldName = 'users';

    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 4;

    constructor(){
        super();
        makeObservable(this, {
            _users: observable,
            _mainStoreFieldName: observable,
            _activePage: observable,
            _pagesTotal: observable,
            _itemsPerPage: observable,
            
            setUsers: action,
            setActivePage: action,
            setPagesTotal: action,
            setItemsPerPage: action,
        })
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
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}