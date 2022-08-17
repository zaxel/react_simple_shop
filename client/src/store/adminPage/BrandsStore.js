import {makeAutoObservable} from "mobx";

export default class BrandsStore{
    
    _brands = [];
    _mainStoreFieldName = 'brands';

    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _updateDataTrigger = false;
    _loading = true;
    
    _newBrands = [];

    constructor(){
        makeAutoObservable(this);
    }
    
    setBrands(brands){
        this._brands = brands;
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
    refreshBrands(){
        this._newBrands = [];
    }
    setNewBrandsInput(id, fieldName, value){
        this._newBrands.find(field=>field.id===id)[fieldName] = value;
    }
    addNewBrandsLine(id){
        this._newBrands.push({ id, 'name': ''});
    }
    dropNewBrandsLine(id){
        this._newBrands = this._newBrands.filter(line => line.id !== id);
    }
    
    get brands(){
        return this._brands;
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
    get newBrands(){
        return this._newBrands;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}