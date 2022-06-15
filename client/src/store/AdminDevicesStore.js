import {makeAutoObservable} from "mobx";

export default class AdminDevicesStore{
    
    _devices = {};
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 4;
    _updateDataTrigger = false;
    _searchBy = '';
    _searchByLast = '';
    _searchByPrase = '';
    _searchByLastPrase = '';
    _loading = true;
    _types = [];
    _brands = [];

    constructor(){
        makeAutoObservable(this);
    }
    
    setUsers(devices){
        this._devices = devices;
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
    setSearchBy(val){
        this._searchBy = val;
    }
    setSearchByLast(val){
        this._searchByLast = val;
    }
    setSearchByPrase(val){
        this._searchByPrase = val;
    }
    setSearchByLastPrase(val){
        this._searchByLastPrase = val;
    }
    setLoading(bool){
        this._loading = bool;
    }
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    
    get devices(){
        return this._devices;
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
    get searchBy(){
        return this._searchBy;
    }
    get searchByLast(){
        return this._searchByLast;
    }
    get searchByPrase(){
        return this._searchByPrase;
    }
    get searchByLastPrase(){
        return this._searchByLastPrase;
    }
    get loading(){
        return this._loading;
    }
    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
}