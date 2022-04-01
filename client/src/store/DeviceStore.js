import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor(){
        this._types = [];
        this._brands = [];
        this._devices = {};
        this._typeActive = null;
        this._brandActive = null;
        this._activePage = 1;
        this._pagesTotal = 1;
        this._itemsPerPage = 4;
        makeAutoObservable(this);
    }
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices){
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