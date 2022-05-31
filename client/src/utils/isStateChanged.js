
export const isStateChanged = (store, userId, dbFieldName, data) => {
    const currentStoreValue = store.users.rows.find(el=>el.id === userId)
    return currentStoreValue[dbFieldName] === data ? false : true
}