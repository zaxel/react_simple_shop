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
        if(isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)){
            componentStore.setUpdateDataTrigger(prev=>!componentStore.updateDataTrigger);
        }
    }
}

export const onInputButtonBlurHandler = (toolTip, setEdit, componentStore, infoId, dbFieldName, value) => {
    setEdit(false);
    toolTip.setIsAvailable(true);
    if(isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)){
        componentStore.setUpdateDataTrigger(prev=>!componentStore.updateDataTrigger);
    }
}

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