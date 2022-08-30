import {$host, $authHost} from ".";

export const fetchAppPage = async () => {
    const {data} = await $host.get(`api/app`); 
    return data;
}


export const updateAppPage = async (id, dbFieldName, data) => {
    console.log(id, dbFieldName, data)
    // const updatedData = await $authHost.put('api/user/' , {id, [dbFieldName]: data});
    // return updatedData.data;
}

