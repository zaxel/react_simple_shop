import {
  fetchAboutPage, fetchAboutBlocks, fetchAboutCard, updateAboutPage, updateAboutCardData,
  updateAboutBtnData, updateAboutCardImg, fetchAboutBtns, createAboutBtn, deleteBtnReq, updateAboutBlockImg
} from "../../http/pageAPI";

export const setStoreField = async (currentStore, setterName, newData) => {
  try {
    const data = await currentStore[setterName](newData);
    return data;
  } catch (e) {
    console.log(e);
    alert(e?.response?.data?.message);
    throw e;
  }
}


export const setComponentLoading = (store, status) => {
  store.setLoading(status);
}


export const fetchPage = async (currentStore) => {
  setComponentLoading(currentStore, true);
  const fetchedData = await fetchAboutPage();
  const setterName = 'setPage';
  setComponentLoading(currentStore, false);
  return setStoreField(currentStore, setterName, fetchedData);
}
export const changeData = async (id, dbFieldName, data) => {
  !Array.isArray(data) && (data = [data]);
  const updatedData = await updateAboutPage(id, dbFieldName, data);
  return updatedData;
}


export const fetchCard = async (currentStore, cardId) => {
  setComponentLoading(currentStore, true);
  const fetchedData = await fetchAboutCard({ cardId });
  const setterName = 'setCurrentCard';
  setComponentLoading(currentStore, false);
  return setStoreField(currentStore, setterName, fetchedData);
}
export const changeAboutCardImg = async (formData) => {
  const updatedData = await updateAboutCardImg(formData);
  return updatedData;
}
export const changeAboutCardData = async (id, dbFieldName, data) => {
  const updatedData = await updateAboutCardData(id, dbFieldName, data);
  return updatedData;
}


export const fetchBlocks = async (currentStore, infoAboutCardId) => {
  setComponentLoading(currentStore, true);
  const fetchedData = await fetchAboutBlocks({ infoAboutCardId });
  const setterName = 'setEditBlocks';
  setComponentLoading(currentStore, false);
  return setStoreField(currentStore, setterName, fetchedData);
  
}
export const changeAboutBlockImg = async (formData) => {
  const updatedData = await updateAboutBlockImg(formData);
  return updatedData;
}

export const createBtn = async (currentStore, text, link) => {
  const fetchedData = await createAboutBtn({ text, link });
  const setterName = 'addButton';
  return setStoreField(currentStore, setterName, fetchedData);
}
export const fetchBtns = async (currentStore) => {
  setComponentLoading(currentStore, true);
  const fetchedData = await fetchAboutBtns();
  const setterName = 'setButtons';
  setComponentLoading(currentStore, false);
  return setStoreField(currentStore, setterName, fetchedData);
}
export const changeAboutBtnData = async (id, dbFieldName, data) => {
  const updatedData = await updateAboutBtnData(id, dbFieldName, data);
  return updatedData;
}
export const deleteBtn = async (currentStore, id) => {
  const updatedData = await deleteBtnReq(id);
  const setterName = 'deleteButton';
  setStoreField(currentStore, setterName, id);
  return updatedData;
}