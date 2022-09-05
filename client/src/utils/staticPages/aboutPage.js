import { fetchAboutPage, fetchAboutBlocks, fetchAboutCard, updateAboutPage, updateAboutCardData,
        updateAboutBtnData, updateAboutCardImg  } from "../../http/pageAPI";

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
export const setAboutCard = async (currentStore, fetchedData) => {
  try {
    currentStore.setLoading(true);
    const data = await currentStore.setCurrentCard(fetchedData);
    return data;
  } catch (e) {
    console.log(e);
    alert(e?.response?.data?.message);
    throw e;
  } finally {
    currentStore.setLoading(false);
  }
}
export const setAboutBlocks = async (currentStore, fetchedData) => {
  try {
    currentStore.setLoading(true);
    const data = await currentStore.setCardBlocks(fetchedData);
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
  const fetchedData = await fetchAboutPage();
  return setStore(currentStore, fetchedData);
}

export const fetchCard = async (currentStore, cardId) => {
  const fetchedData = await fetchAboutCard({cardId});
  return setAboutCard(currentStore, fetchedData);
}
export const fetchBlocks = async (currentStore, infoAboutCardId) => {
  const fetchedData = await fetchAboutBlocks({infoAboutCardId});
  return setAboutBlocks(currentStore, fetchedData);
}

export const changeData = async (id, dbFieldName, data) => {
  !Array.isArray(data) && (data = [data]);
  const updatedData = await updateAboutPage(id, dbFieldName, data);
  return updatedData;
}

export const changeAboutCardImg = async (formData) => {
  const updatedData = await updateAboutCardImg(formData);
  return updatedData;
}

export const changeAboutCardData = async (id, dbFieldName, data) => {
  const updatedData = await updateAboutCardData(id, dbFieldName, data);
  return updatedData;
}
export const changeAboutBtnData = async (id, dbFieldName, data) => {
  const updatedData = await updateAboutBtnData(id, dbFieldName, data);
  return updatedData;
}