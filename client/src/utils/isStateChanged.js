﻿
export const isUserStateChanged = (store, userId, dbFieldName, data) => {
    const currentStoreValue = store.users.rows.find(el=>el.id === userId)
    return currentStoreValue[dbFieldName] === data ? false : true
}
export const isOrderStateChanged = (store, orderId, dbFieldName, data) => {
    const currentStoreValue = store.orders.rows.find(el=>el.id === orderId)
    return currentStoreValue[dbFieldName] === data ? false : true
}
export const isDeviceStateChanged = (store, deviceId, dbFieldName, data) => {
    const currentStoreValue = store.devices.rows.find(el=>el.id === deviceId)
    return currentStoreValue[dbFieldName] === data ? false : true
}
export const isDeviceInfoStateChanged = (store, infoId, dbFieldName, data) => {
    const currentStoreValue = store.info.rows.find(el=>el.id === infoId)
    return currentStoreValue[dbFieldName] === data ? false : true
}