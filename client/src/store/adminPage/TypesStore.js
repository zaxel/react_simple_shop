import {makeObservable, observable, action} from "mobx";
import BaseStore from "./BaseStore";

export default class TypesStore extends BaseStore{
    
    _types = [];
    _mainStoreFieldName = 'types';

    _newTypes = [];

    constructor(){
        super();
        makeObservable(this, {
            _types: observable,
            _mainStoreFieldName: observable,
            _newTypes: observable,
            
            setTypes: action,
            refreshTypes: action,
            setNewTypesInput: action,
            addNewTypesLine: action,
            dropNewTypesLine: action,
        })
    }
    
    setTypes(types){
        this._types = types;
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
    get newTypes(){
        return this._newTypes;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}