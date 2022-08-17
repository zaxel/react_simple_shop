import {makeObservable, observable, computed, action, override} from "mobx";

export default class BaseStore{
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _updateDataTrigger = false;
    _loading = true;

    constructor(){
        makeObservable(this, {
            _sortDirection: observable,
            _sortBy: observable,
            _sortRevers: observable,
            _updateDataTrigger: observable,
            _loading: observable,
            
            setSortDirection: action,
            setSortBy: action,
            setUpdateDataTrigger: action,
            setLoading: action,
        })
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