import {makeObservable, observable, action} from "mobx";
import BaseWithSearchStore from "./BaseWithSearchStore";

export default class OrdersStore extends BaseWithSearchStore{
    
    _orders = {};
    _mainStoreFieldName = 'orders';

    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 8;

    constructor(){
        super();
        makeObservable(this, {
            _orders: observable,
            _mainStoreFieldName: observable,
            _activePage: observable,
            _pagesTotal: observable,
            _itemsPerPage: observable,
            
            setOrders: action,
            setActivePage: action,
            setPagesTotal: action,
            setItemsPerPage: action,
        })
    }
    
    setOrders(orders){
        this._orders = orders;
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
    
    get orders(){
        return this._orders;
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