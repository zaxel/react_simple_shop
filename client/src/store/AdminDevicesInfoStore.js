import {makeAutoObservable} from "mobx";

export default class AdminDevicesStore{
    
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _updateDataTrigger = false;
    _loading = true;
    _info = [];

    constructor(){
        makeAutoObservable(this);
    }
    
    setInfo(info){
        this._info = info;
    }
    setSortDirection(direction){
        this._sortDirection = direction;
    }
    setSortBy(by){
        this._sortBy = by;
    }
    setUpdateDataTrigger(bool){
        this._updateDataTrigger = bool;
    }
    setLoading(bool){
        this._loading = bool;
    }
    
   
    
    get info(){
        return this._info;
    }
    get sortDirection(){
        return this._sortDirection;
    }
    get sortBy(){
        return this._sortBy;
    }
    get updateDataTrigger(){
        return this._updateDataTrigger;
    }
    get loading(){
        return this._loading;
    }
}