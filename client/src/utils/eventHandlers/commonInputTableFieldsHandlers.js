import { isStateChangedTableFieldCommon } from "../isStateChanged";

export const onTableCellClickHandler = (toolTip, setEdit) => {
    toolTip.setIsToolTipShown(false);
    toolTip.setIsAvailable(false);
    setEdit(true);
}

export const onInputBlurHandler = (toolTip, setEdit, e, confirmButtonRef, componentStore, infoId, dbFieldName, value) => {
    if (!(e.relatedTarget === confirmButtonRef.current)) {
        setEdit(false);
        toolTip.setIsAvailable(true);
        if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
            componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);
        }
    }
}

export const onInputButtonBlurHandler = (toolTip, setEdit, componentStore, infoId, dbFieldName, value) => {
    setEdit(false);
    toolTip.setIsAvailable(true);
    if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
        componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);
    }
}
export const onFileButtonBlurHandler = (toolTip, setEdit, e, fileRef) => {
    if (!(e.relatedTarget === fileRef.current)) {
        setEdit(false);
        toolTip.setIsAvailable(true);
    }
}

// OnClickHandlerReloadCheck
export const onInputButtonClickHandler = async (toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value) => {
    if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
        setLoading(true);
        const data = await cb();
        if (data.loggedOut) return;
        setLoading(false);
        componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);
    }
    setEdit(false);
    toolTip.setIsAvailable(true);
}

// OnClickHandlerNoReload
export const onClickNoReloadHandler = async (toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value) => {
    if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
        setLoading(true);
        const data = await cb();
        if (data.loggedOut) return;
        setLoading(false);
    }
    setEdit(false);
    toolTip.setIsAvailable(true);
}

// noChangeCheck
export const onClickNoChangeCheckHandler = async (setLoading, cb, componentStore) => {
    setLoading(true);
    const data = await cb();
    if (data.loggedOut) return;
    setLoading(false);
    componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);

}

class OnClickHandlerCommon{
    constructor(setLoading, cb, componentStore){
        this._setLoading = setLoading;
        this._cb = cb;
        this._componentStore = componentStore;
        this._data = null;
    }
    async setLoadingAndFetch(){
        this._setLoading(true);
        this._data = await this._cb();
        if (this._data.loggedOut) return;
        this._setLoading(false);
    }
    async returnRequestedData(){
        return this._data
    }
    updateComponent(){
        this._componentStore.setUpdateDataTrigger(!this._componentStore.updateDataTrigger);
    }
    async createHandler(){
        await this.setLoadingAndFetch();
        this.updateComponent();
    }
}
class OnClickHandlerNoReload extends OnClickHandlerCommon{
    constructor(toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value){
        super(setLoading, cb, componentStore);
        this._toolTip = toolTip;
        this._setEdit = setEdit;
        this._infoId = infoId;
        this._dbFieldName = dbFieldName;
        this._value = value;
    }
    async createHandler(){
        if (isStateChangedTableFieldCommon(this._componentStore, this._componentStore.mainStoreFieldName, this._infoId, this._dbFieldName, this._value)){
            await super.setLoadingAndFetch();
        }
        this._setEdit(false);
        this._toolTip.setIsAvailable(true);
    }
}

class OnClickHandlerReloadCheck extends OnClickHandlerNoReload{
    async createHandler(){
        if (isStateChangedTableFieldCommon(this._componentStore, this._componentStore.mainStoreFieldName, this._infoId, this._dbFieldName, this._value)){
            await super.setLoadingAndFetch();
            super.updateComponent();
            return;
        }
        this._setEdit(false);
        this._toolTip.setIsAvailable(true);
    }
} 


export class OnClickHandlerMaker{
    static noChangeCheck(setLoading, cb, componentStore){
        return new OnClickHandlerCommon(setLoading, cb, componentStore).createHandler();
    }
    static noReload(toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value){
        return new OnClickHandlerNoReload(toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value).createHandler();
    }
    static withCheckAndReload(toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value){
        return new OnClickHandlerReloadCheck(toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value).createHandler();
    }
}