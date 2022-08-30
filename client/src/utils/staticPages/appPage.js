import { fetchAppPage, updateAppPage } from "../../http/pageAPI";

export const setStore = async (currentStore, fetchedData) => {
    try {
        currentStore.setLoading(true);
        const data = await currentStore.setPage(fetchedData);
        return data;
    } catch (e) {
        console.log(e);
        alert(e?.response?.data?.message);
        throw e;
    } finally {
        currentStore.setLoading(false);
    }
}


export const fetchPage = async (currentStore) => {
    const fetchedData = await fetchAppPage();
    return setStore(currentStore, fetchedData);
  }

  export const setData = async (id, dbFieldName, data) => {
    !Array.isArray(data) && (data = [data]);
    const updatedData = await updateAppPage(id, dbFieldName, data);
    return updatedData;
  }