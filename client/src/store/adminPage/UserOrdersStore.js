import {makeObservable, observable, action} from "mobx";
import BaseStore from "./BaseStore";

export default class UserOrdersStore extends BaseStore{
    _userOrders = {};
    _mainStoreFieldName = 'userOrders';

    _searchBy = 'userId';
    _searchByPrase = '';
    
    _itemsPerPage = 100;

    constructor(){
        super();
        makeObservable(this, {
            _userOrders: observable,
            _mainStoreFieldName: observable,
            _searchBy: observable,
            _searchByPrase: observable,
            _itemsPerPage: observable,
            
            setUserOrders: action,
            setSearchByPrase: action,
        })
    }
    setUserOrders(orders){
        this._userOrders = orders;
    }
    setSearchByPrase(userId){
        this._searchByPrase = userId;
    }
    
    get userOrders(){
        return this._userOrders;
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