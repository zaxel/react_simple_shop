module.exports = class DevicesMainSearchDto { 
    constructor(arr){
        this.devices = arr;
        this.serializedDevices = [];
        this.serializedDevices = this.devices.map(({id, name, seller_dscr, price, rate, img=[], createdAt, updatedAt, typeId, brandId, device_rank, highlighted_name, info_id, info_title, info_description, info_highlighted_title, info_highlighted_description, info_rank})=>{
            return {id, name, seller_dscr, price, rate, 
                img: img.map(image=>structuredClone(image)), 
            createdAt, updatedAt, typeId, brandId, device_rank, highlighted_name, info_id, info_title, info_description, info_highlighted_title, info_highlighted_description, info_rank}
        })
        this.count = arr.length > 0 ? arr[0].total_count : 0;
    }
    getResult(){
        return {count: this.count, rows: this.serializedDevices}; 
    } 
}