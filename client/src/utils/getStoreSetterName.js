﻿export const getMainSetterName = (store) => {
    if(!store || !store.mainStoreFieldName)return;
    const firstLetter = store.mainStoreFieldName.substring(0, 1);
    const noFirstLetter = store.mainStoreFieldName.substring(1);
    return 'set' + firstLetter.toUpperCase() + noFirstLetter;
}
export const getSetterName = (string) => {
    if(!string)return;
    const firstLetter = string.substring(0, 1);
    const noFirstLetter = string.substring(1);
    return 'set' + firstLetter.toUpperCase() + noFirstLetter;
}