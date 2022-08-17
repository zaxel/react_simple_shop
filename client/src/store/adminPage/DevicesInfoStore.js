import {makeObservable, observable, action, override} from "mobx";
import BaseStore from "./BaseStore";

export default class DevicesInfoStore extends BaseStore{
    
    _info = {};
    _newInfo = [];  // [{ id: 18, title: 'tester', description: 'some description' }, ... ]
    _mainStoreFieldName = 'info';

    _deviceId = null;
    _deviceName = '';

    constructor(){
        super();
        makeObservable(this, {
            _info: observable,
            _newInfo: observable,
            _mainStoreFieldName: observable,
            _deviceId: observable,
            _deviceName: observable,
            
            setInfo: action,
            refreshNewInfo: action,
            setNewInfoInput: action,
            addNewInfoLine: action,
            dropNewInfoLine: action,
            setDeviceId: action,
            setDeviceName: action,
        })
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
    get deviceId(){
        return this._deviceId;
    }
    get deviceName(){
        return this._deviceName;
    }
    get mainStoreFieldName(){
        return this._mainStoreFieldName;
    }
}