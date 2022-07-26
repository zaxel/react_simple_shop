import {makeAutoObservable} from "mobx";

export default class AdminTypesStore{
    
    _types = [];
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _updateDataTrigger = false;
    _loading = true;

    constructor(){
        makeAutoObservable(this);
    }
    
    setTypes(types){
        this._types = types;
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
    
    get types(){
        return this._types;
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