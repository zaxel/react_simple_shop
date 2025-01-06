import {$host, $authHost} from ".";

export const updatePageImg = async (formData) => {
    const updatedData = await $authHost.put('api/page/image' , formData);
    return updatedData.data;
}

export const fetchAppPage = async () => {
    const {data} = await $host.get(`api/app`); 
    return data;
}

export const updateAppPage = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/page' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const updateAppCardImg = async (formData) => {
    const { data } = await $authHost.patch('api/app/card/img-update/' , formData);
    return data; 
}
export const updateAppCardData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/app/card' , {id, [dbFieldName]: data});
    return updatedData.data;
}

export const fetchAboutPage = async () => {
    const {data} = await $host.get(`api/about`); 
    return data;
}
export const updateAboutPage = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/page' , {id, [dbFieldName]: data});
    return updatedData.data;
}

export const fetchAboutCard = async ({cardId}) => {
    const {data} = await $host.get(`api/about/card/${cardId}`); 
    return data;
}
export const updateAboutCardImg = async (formData) => {
    const { data } = await $authHost.patch('api/about/card/img-update/' , formData);
    return data; 
}
export const updateAboutCardData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/card' , {id, [dbFieldName]: data});
    return updatedData.data;
}

export const fetchAboutBlocks = async () => {
    const {data} = await $host.get(`api/about/blocks`); 
    return data;
}
export const createAboutBlock = async (formData) => {
    const updatedData = await $authHost.post('api/about/block', formData);
    return updatedData.data;
}
export const updateAboutBlockData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/block' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const updateAboutBlocksPosition = async ( positions) => {
    const updatedData = await $authHost.put('api/about/block-position' , {positions});
    return updatedData.data; 
}
export const updateAboutBlockImg = async (formData) => {
    const { data } = await $authHost.patch('api/about/block/img-update/' , formData);
    return data; 
}
export const deleteBlockReq = async (id) => {
    const updatedData = await $authHost.delete('api/about/block' , {
        data: {id}
      });
    return updatedData.data;
}

export const createAboutBtn = async ({text, link}) => {
    const updatedData = await $authHost.post('api/about/btn', {text, link});
    return updatedData.data;
}
export const fetchAboutBtns = async () => {
    const updatedData = await $authHost.get('api/about/btns');
    return updatedData.data;
}
export const updateAboutBtnData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/btn' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const deleteBtnReq = async (id) => {
    const updatedData = await $authHost.delete('api/about/btn' , {
        data: {id}
      });
    return updatedData.data;
}

export const fetchHelpPage = async () => {
    const {data} = await $host.get(`api/help`); 
    return data;
}
export const updateHelpPage = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/page' , {id, [dbFieldName]: data});
    return updatedData.data;
}

export const fetchFaqById = async ({id}) => {
    const {data} = await $host.get(`api/help/faq/`, {params:{
        id 
    }});
    return data;
}
export const fetchFaqByTitle = async ({title}) => {
    const {data} = await $host.get(`api/help/singlefaq/${title}`); 
    return data;
}
export const fetchFaqs = async () => {
    const {data} = await $host.get(`api/help/faqs`);
    return data;
}
export const createFaqs = async (question, answerTitle, answerText) => {
    const updatedData = await $authHost.post('api/help/faq', {question, answerTitle, answerText}); 
    return updatedData.data;  
}
export const fetchQuestions = async (categoryId, page, limit, categories) => {
    console.log(categoryId, page, limit, categories);
    const fetchedData = await $host.get('api/help/question', {params:{
        categoryId, page, limit, categories
    }});  
    console.log(fetchedData.data);
    return fetchedData.data;
}
export const fetchSearchFaq = async (searchPhrase, page, limit, categories) => {
    console.log(searchPhrase, page, limit, categories);
    const fetchedData = await $host.get('api/help/search', {params:{
        searchPhrase, page, limit, categories
    }});  
    console.log(fetchedData.data);
    return fetchedData.data;
}
export const updateHelpFaqPosition = async ({categoryId, positions}) => {
    const updatedData = await $authHost.put('api/help/faq/position' , {categoryId, positions});
    return updatedData.data; 
}

export const updateFaqAnswer = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/help/answer' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const updateFaqQuestion = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/help/question' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const deleteFaqReq = async (id) => {
    const updatedData = await $authHost.delete('api/help/faq' , {
        data: {id}
      });
    return updatedData.data;
}
export const fetchRelated = async (id) => {
    const fetchedData = await $host.get('api/help/related' , {params:{
        id
    }});
    return fetchedData.data;
}
export const addRelatedReq = async (faq_id, infoHelpQuestionId) => {
    const fetchedData = await $authHost.post('api/help/related' , {faq_id, infoHelpQuestionId});
    return fetchedData.data;
}
export const removedRelatedReq = async (faq_id, infoHelpQuestionId) => {
    const fetchedData = await $authHost.delete('api/help/related' , {
        data: {faq_id, infoHelpQuestionId} 
    });
    return fetchedData.data;
}


export const fetchCategory = async (id) => {
    const fetchedData = await $host.get('api/help/category' , {params:{
        id
    }});
    return fetchedData.data;
}
export const createCategoryReq = async (formData) => {
    const updatedData = await $authHost.post('api/help/category', formData);
    return updatedData.data; 
}
export const updateCategory = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/help/category', {id, [dbFieldName]: data});
    return updatedData.data; 
}
export const changeCatImgReq = async (formData) => {
    const { data } = await $authHost.patch('api/help/category/img-update/', formData);
    return data;
}
export const updateHelpCatPosition = async (positions) => {
    const updatedData = await $authHost.put('api/help/category/position' , {positions});
    return updatedData.data; 
}

export const deleteCategoryReq = async ({id, catPositions}) => {
    const updatedData = await $authHost.delete('api/help/category', {data: {id, catPositions}});
    return updatedData.data;  
}

export const fetchPopular = async () => {
    const fetchedData = await $host.get('api/help/popular');
    return fetchedData.data;  
}