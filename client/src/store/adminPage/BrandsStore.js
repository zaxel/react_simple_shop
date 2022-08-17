import {makeObservable, observable, computed, action, override} from "mobx";
import BaseStore from "./BaseStore";

export default class BrandsStore extends BaseStore{
    
    _brands = [];
    _mainStoreFieldName = 'brands';
    _newBrands = [];

    constructor(){
        super();
        makeObservable(this, {
            _brands: observable,
            _mainStoreFieldName: observable,
            _newBrands: observable,
            
            setBrands: action,
            refreshBrands: action,
            setNewBrandsInput: action,
            addNewBrandsLine: action,
            dropNewBrandsLine: action,
        })
    }
    
    setBrands(brands){
        this._brands = brands;
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
    get newBrands(){
        return this._newBrands;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}