import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    _types = [];
    _brands = [];
    _devices = {};
    _typeActive = null;
    _brandActive = null;
    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 30;
    constructor(){
        
        makeAutoObservable(this);
    }
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices){
        console.log(devices)
        this._devices = devices;
    }
    setTypeActive(typeId){
        this._typeActive = typeId;
    }
    setBrandActive(typeId){
        this._brandActive = typeId;
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
    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get devices(){
        return this._devices;
    }
    get typeActive(){
        return this._typeActive;
    }
    get brandActive(){
        return this._brandActive;
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