
export const isUserStateChanged = (store, userId, dbFieldName, data) => {
    const currentStoreValue = store.users.rows.find(el=>el.id === userId)
    return currentStoreValue[dbFieldName] === data ? false : true
}
export const isOrderStateChanged = (store, orderId, dbFieldName, data) => {
    const currentStoreValue = store.orders.rows.find(el=>el.id === orderId)
    return currentStoreValue[dbFieldName] === data ? false : true
}