import {makeAutoObservable} from "mobx";

export default class AdminTypesStore{
    
    _types = [];
    _mainStoreFieldName = 'types';
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _updateDataTrigger = false;
    _loading = true;
    _newTypes = [];

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
    refreshTypes(){
        this._newTypes = [];
    }
    setNewTypesInput(id, fieldName, value){
        this._newTypes.find(field=>field.id===id)[fieldName] = value;
    }
    addNewTypesLine(id){
        this._newTypes.push({ id, 'name': ''});
    }
    dropNewTypesLine(id){
        this._newTypes = this._newTypes.filter(line => line.id !== id);
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
    get newTypes(){
        return this._newTypes;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}