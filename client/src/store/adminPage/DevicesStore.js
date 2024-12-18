import {action, makeObservable, observable} from "mobx";
import BaseWithSearchStore from "./BaseWithSearchStore";

export default class DevicesStore extends BaseWithSearchStore{
    
    _devices = {};
    _mainStoreFieldName = 'devices';

    _activePage = 1;
    _pagesTotal = 1;
    _itemsPerPage = 12;
    
    _types = [];
    _brands = [];
    _typeActive = null;
    _brandActive = null;
    _deviceActive = null;
    _deviceSellerDescription = "";

    constructor(){
        super();
        makeObservable(this, {
            _devices: observable,
            _mainStoreFieldName: observable,
            _activePage: observable,
            _pagesTotal: observable,
            _itemsPerPage: observable,
            _types: observable,
            _brands: observable,
            _typeActive: observable,
            _brandActive: observable,
            _deviceActive: observable,
            _deviceSellerDescription: observable,

            setDevices: action,
            setActivePage: action,
            setPagesTotal: action,
            setItemsPerPage: action,
            setTypes: action,
            setBrands: action,
            setTypeActive: action,
            setBrandActive: action,
            setDeviceActive: action,
            setDeviceSellerDescription: action,
            setClearDeviceSellerDescription: action,
            
        })
    }

    setDevices(devices){
        this._devices = devices;
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
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setTypeActive(typeId){
        this._typeActive = typeId;
    }
    setBrandActive(typeId){
        this._brandActive = typeId;
    }
    setDeviceActive(deviceId){
        this._deviceActive = deviceId;
    }
    setDeviceSellerDescription(){
        this._deviceSellerDescription = this._devices.rows.find(el=>el.id===this._deviceActive)?.seller_dscr;
    }
    setClearDeviceSellerDescription(){
        this._deviceSellerDescription = "";
    }
    
    get devices(){
        return this._devices;
    }
    get deviceSellerDescription(){
        return this._deviceSellerDescription;
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
    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
    get typeActive(){
        return this._typeActive;
    }
    get brandActive(){
        return this._brandActive;
    }
    get deviceActive(){
        return this._deviceActive;
    }
}