import {
  createFaqs, deleteFaqReq, fetchFaqs, fetchHelpPage, fetchQuestions, updateFaqAnswer, updateFaqQuestion,
  updateHelpPage, updatePageImg, fetchCategory, fetchRelated, addRelatedReq, removedRelatedReq, createCategoryReq, 
  deleteCategoryReq, updateCategory, changeCatImgReq, updateHelpCatPosition, updateHelpFaqPosition, fetchPopular  
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
export const fetchStarterQuestions = async (currentStore, categories) => {
  try {
    const categoryId = null; 
    const page = 1; 
    const limit = 3;
    const fetchedData = await fetchQuestions(categoryId, page, limit, categories);
    const setterName = 'setStarterQuestions';
    return setStoreField(currentStore, setterName, fetchedData); 

  } catch (e) {
    console.log(e)
  }
}
export const fetchCategoryFaqQuestions = async (currentStore, categoryId, page, limit, categories) => {
  try {
    const fetchedData = await fetchQuestions(categoryId, page, limit, categories);
    const setterName = 'setQuestions';
    return setStoreField(currentStore, setterName, fetchedData); 
  } catch (e) {
    console.log(e)
  }
}
export const setFaqCategory = async (currentStore, id, categoryId) => {
  try {
    let order_id = null;
    if(categoryId)
      order_id = currentStore.questions.length;
    const dbFieldName = 'catNewFaqData';
    const fetchedData = await updateFaqQuestion(id, dbFieldName, {infoHelpCategoryId: categoryId, order_id, positions: currentStore.faqPositions, fromCategoryId: currentStore.activeCatBody});  
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
    setStoreField(currentStore, 'updateQuestion', { id, data })
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
    setStoreField(currentStore, 'updateAnswer', { id, [dbFieldName]: data });
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
export const changeHelpFaqPosition = async ({categoryId, positions}) => {
  const updatedData = await updateHelpFaqPosition({categoryId, positions});
  return updatedData; 
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

export const fetchFaqCategory = async (currentStore) => {
  try {
    const fetchedData = await fetchCategory();
    const setterName = 'setCategories';
    await setStoreField(currentStore, setterName, fetchedData);
    return fetchedData;
  } catch (e) {
    console.log(e)
  }
}
export const createCategory = async (currentStore, formData) => {
  try {
    const fetchedData = await createCategoryReq(formData);
    const setterName = 'addCategory';
    setStoreField(currentStore, setterName, fetchedData);
    return fetchedData;
  } catch (e) {
    console.log(e)
  }
}
export const changeCatData = async (id, dbFieldName, currentStore, data) => {
  try {
    setComponentLoading(currentStore, false)
    const updatedData = await updateCategory(id, dbFieldName, data);
    setStoreField(currentStore, 'updateCategory', { id, [dbFieldName]: data }); 
    return updatedData;
  } catch (e) {
    console.log(e)
  } finally {
    setComponentLoading(currentStore, false);
  }
}
export const changeCatImg = async (formData, currentStore) => {
  try {
    const updatedData = await changeCatImgReq(formData);
    setStoreField(currentStore, 'updateCategoryImg', updatedData);
  return updatedData;
  } catch (e) {
    console.log(e)
  }
}
export const changeHelpCatPosition = async (positions) => {
  const updatedData = await updateHelpCatPosition(positions);
  return updatedData; 
}
export const deleteFaqCategory = async ({ id, catPositions }) => {
  try {
    const fetchedData = await deleteCategoryReq({ id, catPositions });
    return fetchedData;
  } catch (e) {
    console.log(e)
  }
}

export const fetchPopularFaqs = async (currentStore) => {
  try {
    const fetchedData = await fetchPopular();
    const setterName = 'setFaqPopular';
    return setStoreField(currentStore, setterName, fetchedData);
  } catch (e) {
    console.log(e)
  }
}

