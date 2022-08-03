import {makeAutoObservable} from "mobx";

export default class AdminDevicesInfoStore{
    
    _sortDirection = 'ASC';
    _sortBy = 'id';
    _sortRevers = false;
    _updateDataTrigger = false;
    _loading = true;
    _info = {};
    _newInfo = [];  // [{ id: 18, title: 'tester', description: 'some description' }, ... ]
    _deviceId = null;
    _deviceName = '';

    constructor(){
        makeAutoObservable(this);
    }
    
    setInfo(info){
        this._info = info;
    }
    refreshNewInfo(){
        this._newInfo = [];
    }
    setNewInfoInput(id, fieldName, value){
        this._newInfo.find(field=>field.id===id)[fieldName] = value;
    }
    addNewInfoLine(id){
        this._newInfo.push({ id, title: '', description: '' });
    }
    dropNewInfoLine(id){
        this._newInfo = this._newInfo.filter(line => line.id !== id);
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
    setDeviceId(deviceId){
        this._deviceId = deviceId;
    }
    setDeviceName(deviceName){
        this._deviceName = deviceName;
    }
    
   
    
    get info(){
        return this._info;
    }
    get newInfo(){
        return this._newInfo;
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
    get deviceId(){
        return this._deviceId;
    }
    get deviceName(){
        return this._deviceName;
    }
}