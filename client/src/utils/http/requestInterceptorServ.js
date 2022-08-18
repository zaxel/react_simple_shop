export const removeEmptyParams = (config) => {
    config.params && Object.keys(config.params).forEach(el=>{
        if(!config.params[el]){
            delete config.params[el];
        }
    })
}
