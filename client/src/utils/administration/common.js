
export const setDataToStore = async (store, setterName, data) => {
    return await store[setterName](data); 
}

export const fetchAll = async (cb, ...rest) => {
    // rest - id, sortBy, sortDirection, limit, page, searchBy, searchPrase, brandId, typeId
    const fetchedData = await cb(...rest); 
    if (fetchedData.count === 0) alert('Nothing found!')
    return fetchedData;
}