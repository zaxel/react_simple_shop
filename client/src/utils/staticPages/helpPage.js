import {
  createFaqs, deleteFaqReq, fetchFaqs, fetchHelpPage, fetchQuestions, updateFaqAnswer, updateFaqQuestion, 
  updateHelpPage, updatePageImg, fetchCategory, fetchRelated, addRelatedReq, removedRelatedReq
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
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}
export const fetchFaqQuestions = async (currentStore) => {
  try {
    const fetchedData = await fetchQuestions(); 
    const setterName = 'setAllQuestions';
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
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

export const fetchFaqCategory = async (currentStore) => {
  try {
    const fetchedData = await fetchCategory(); 
    const setterName = 'setCategories'; 
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
  } 
}
export const fetchRelatedRelations = async (currentStore, id) => {
  try {
    const fetchedData = await fetchRelated(id); 
    const setterName = 'setFaqRelated';
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
  } 
}
export const addRelatedFaq = async (currentStore, faq_id, infoHelpQuestionId) => {
  try {
    const fetchedData = await addRelatedReq(faq_id, infoHelpQuestionId); 
    const setterName = 'addRelated';
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
  }
}
export const removeRelatedFaq = async (currentStore, faq_id, infoHelpQuestionId) => {
  try {
    const fetchedData = await removedRelatedReq(faq_id, infoHelpQuestionId); 
    const setterName = 'removeRelated';
    return setStoreField(currentStore, setterName, infoHelpQuestionId);
  } catch (e) {
    console.log(e)
  }
}

