import {makeObservable, observable, action} from "mobx";
import BaseStore from "./BaseStore";

export default class BaseWithSearchStore extends BaseStore{
    _searchBy = '';
    _searchByLast = '';
    _searchByPrase = '';
    _searchByLastPrase = '';

    constructor(){
        super();
        makeObservable(this, {
            _searchBy: observable,
            _searchByLast: observable,
            _searchByPrase: observable,
            _searchByLastPrase: observable,

            setSearchBy: action,
            setSearchByLast: action,
            setSearchByPrase: action,
            setSearchByLastPrase: action,
        })
    }
    setSearchBy(val){
        this._searchBy = val;
    }
    setSearchByLast(val){
        this._searchByLast = val;
    }
    setSearchByPrase(val){
        this._searchByPrase = val;
    }
    setSearchByLastPrase(val){
        this._searchByLastPrase = val;
    }

    get searchBy(){
        return this._searchBy;
    }
    get searchByLast(){
        return this._searchByLast;
    }
    get searchByPrase(){
        return this._searchByPrase;
    }
    get searchByLastPrase(){
        return this._searchByLastPrase;
    }
}