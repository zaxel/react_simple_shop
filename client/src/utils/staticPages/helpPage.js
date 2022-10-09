import {
  createFaqs,
  deleteFaqReq,
  fetchFaqs,
  fetchHelpPage, updateFaqAnswer, updateFaqQuestion, updateHelpPage, updatePageImg
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
  const fetchedData = await fetchHelpPage();
  const setterName = 'setPage';
  setComponentLoading(currentStore, false);
  return setStoreField(currentStore, setterName, fetchedData);
}
export const changeData = async (id, dbFieldName, data) => {
  !Array.isArray(data) && (data = [data]);
  const updatedData = await updateHelpPage(id, dbFieldName, data);
  return updatedData;
}
export const changeTitle = async (id, dbFieldName, currentStore, data) => {
  data = [data, currentStore.contactTitle || ''];
  const updatedData = await updateHelpPage(id, dbFieldName, data);
  setStoreField(currentStore, 'setPageTitle', data[0])
  return updatedData;
}
export const changeContactTitle = async (id, dbFieldName, currentStore, data) => {
  data = [currentStore.pageTitle || '', data];
  const updatedData = await updateHelpPage(id, dbFieldName, data);
  setStoreField(currentStore, 'setContactTitle', data[1])
  return updatedData;
}
export const changePageHero = async (formData) => {
  const updatedData = await updatePageImg(formData);
  return updatedData;
}



export const fetchAllFaqs = async (currentStore) => {

  try {
    setComponentLoading(currentStore, true);
    const fetchedData = await fetchFaqs();
     
    const setterName = 'setAllFaqs';
    setComponentLoading(currentStore, false);
     
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}
export const createNewFaq = async (currentStore, question, answerTitle, answerText) => {
  try {
    const fetchedData = await createFaqs(question, answerTitle, answerText);
    const setterName = 'addNewFaq';
    setStoreField(currentStore, setterName, fetchedData);
    return fetchedData;
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}

export const changeFaqQuestion = async (id, dbFieldName, currentStore, data) => {
  try {
      const updatedData = await updateFaqQuestion(id, dbFieldName, data);
      setStoreField(currentStore, 'updateQuestion', {id, data})
      return updatedData;
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}
export const changeFaqAnswer = async (id, dbFieldName, currentStore, data) => {
  try {
      const updatedData = await updateFaqAnswer(id, dbFieldName, data);
      setStoreField(currentStore, 'updateAnswer', {id, [dbFieldName]: data}); 
      return updatedData;
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}
export const deleteFaq = async (id, currentStore) => {
  try {
    setComponentLoading(currentStore, true); 
      const updatedData = await deleteFaqReq(id);
      setStoreField(currentStore, 'deleteFaq', id); 
      return updatedData;
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}


// export const fetchCard = async (currentStore, cardId) => {
//   setComponentLoading(currentStore, true);
//   const fetchedData = await fetchAboutCard({ cardId });
//   const setterName = 'setCurrentCard';
//   setComponentLoading(currentStore, false);
//   return setStoreField(currentStore, setterName, fetchedData);
// }
// export const changeAboutCardImg = async (formData) => {
//   const updatedData = await updateAboutCardImg(formData);
//   return updatedData;
// }
// export const changeAboutCardData = async (id, dbFieldName, data) => {
//   const updatedData = await updateAboutCardData(id, dbFieldName, data);
//   return updatedData;
// }


// export const fetchBlocks = async (currentStore) => {
//   setComponentLoading(currentStore, true);
//   const fetchedData = await fetchAboutBlocks();
//   const setterName = 'setEditBlocks';
//   setComponentLoading(currentStore, false);
//   return setStoreField(currentStore, setterName, fetchedData);

// }
// export const createBlock = async (currentStore, formData) => {
//   setComponentLoading(currentStore, true);
//   const fetchedData = await createAboutBlock(formData);
//   const setterName = 'addEditBlocks';
//   setStoreField(currentStore, setterName, fetchedData);
//   setComponentLoading(currentStore, false);
//   return fetchedData;
// }
// export const deleteBlock = async (currentStore, id) => {
//   try{
//     const updatedData = await deleteBlockReq(id);
//     const setterName = 'deleteBlock';
//     setStoreField(currentStore, setterName, id);
//     return updatedData;
//   }catch(e){
//     console.log(e)
//   }
// }

// export const updateBlockBtns = async (btnsCopy, store) => {
//   const newBtnsIds = Object.keys(btnsCopy);
//   setStoreField(store, 'setModalBtnsLoading', true);
//   await changeAboutBlockData(store.activeBlockEdit, 'button_id', newBtnsIds);
//   setStoreField(store, 'editEditBlocksBtns', btnsCopy);
//   setStoreField(store, 'setModalBtnsLoading', false);
// }
// export const changeAboutBlockData = async (id, dbFieldName, data) => {
//   const updatedData = await updateAboutBlockData(id, dbFieldName, data);
//   return updatedData;
// }
// export const changeAboutBlocksPosition = async (positions) => {
//   const updatedData = await updateAboutBlocksPosition(positions);
//   return updatedData;
// }
// export const changeAboutBlockImg = async (formData) => {
//   const updatedData = await updateAboutBlockImg(formData);
//   return updatedData;
// }

// export const createBtn = async (currentStore, text, link) => {
//   const fetchedData = await createAboutBtn({ text, link });
//   const setterName = 'addButton';
//   return setStoreField(currentStore, setterName, fetchedData);
// }
// export const fetchBtns = async (currentStore) => {
//   setComponentLoading(currentStore, true);
//   const fetchedData = await fetchAboutBtns();
//   const setterName = 'setButtons';
//   setComponentLoading(currentStore, false);
//   return setStoreField(currentStore, setterName, fetchedData);
// }
// export const changeAboutBtnData = async (id, dbFieldName, data) => {
//   const updatedData = await updateAboutBtnData(id, dbFieldName, data);
//   return updatedData;
// }
// export const deleteBtn = async (currentStore, id) => {
//   const updatedData = await deleteBtnReq(id);
//   const setterName = 'deleteButton';
//   setStoreField(currentStore, setterName, id);
//   return updatedData;
// }


// export const fetchBtnsModal = async (currentStore) => {
//   const fetchedData = await fetchAboutBtns();
//   const setterName = 'setButtonsModal';
//   return setStoreField(currentStore, setterName, fetchedData);
// }