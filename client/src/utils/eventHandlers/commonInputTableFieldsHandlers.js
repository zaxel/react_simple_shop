import { offEditOnTooltip, loadingAndFetch, isStateChangedTableFieldCommon } from "./commonAssistants";

export const onTableCellClickHandler = (toolTip, setEdit) => {
    toolTip.setIsToolTipShown(false);
    toolTip.setIsAvailable(false);
    setEdit(true);
}

export const onInputButtonBlurHandler = (toolTip, setEdit, componentStore, infoId, dbFieldName, value) => {
    offEditOnTooltip(setEdit, toolTip)
    if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
        componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);
    }
}

export const onInputBlurHandler = (toolTip, setEdit, e, confirmButtonRef, componentStore, infoId, dbFieldName, value) => {
    if (!(e.relatedTarget === confirmButtonRef.current)) {
        onInputButtonBlurHandler(toolTip, setEdit, componentStore, infoId, dbFieldName, value);
    }
}

export const onFileButtonBlurHandler = (toolTip, setEdit, e, fileRef) => {
    if (!(e.relatedTarget === fileRef.current)) {
        offEditOnTooltip(setEdit, toolTip)
    }
}

// withCheckAndReload
export const onInputButtonClickHandler = async (toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value) => {
    if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
        console.log(componentStore.mainStoreFieldName)
        await loadingAndFetch(setLoading, cb);
        componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);
    }else{
        offEditOnTooltip(setEdit, toolTip)
    }
}

// noReload
export const onClickNoReloadHandler = async (toolTip, setEdit, setLoading, cb, componentStore, infoId, dbFieldName, value) => {
    if (isStateChangedTableFieldCommon(componentStore, componentStore.mainStoreFieldName, infoId, dbFieldName, value)) {
        const fetchedData = await loadingAndFetch(setLoading, cb);
        if(!fetchedData)return;
    }
    offEditOnTooltip(setEdit, toolTip)
}

// noChangeCheck
export const onClickNoChangeCheckHandler = async (setLoading, cb, componentStore) => {
    await loadingAndFetch(setLoading, cb);
    componentStore.setUpdateDataTrigger(prev => !componentStore.updateDataTrigger);
}