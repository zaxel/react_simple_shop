import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor(){
        this._types = [
            { id: 1, name: "fridges" }, 
            { id: 2, name: "phones" },
            { id: 4, name: "cars" }
        ];
        this._brands = [
            { id: 1, name: "siemence" },
            { id: 2, name: "LG" },
            { id: 3, name: "Toshiba" },
            { id: 4, name: "iPhone" },
            { id: 5, name: "Nokia" },
            { id: 6, name: "Sony" }
        ]
        this._devices = {
            "count": 12,
            "rows": [
                {
                    "id": 1,
                    "name": "lg-6758",
                    "price": 120,
                    "rate": 0,
                    "img": "bbb6d36b-678a-47e7-82d9-9ffa8c9e7eb6.jpg",
                    "typeId": 1,
                    "brandId": 2
                },
                {
                    "id": 2,
                    "name": "lsiem-45",
                    "price": 1000,
                    "rate": 0,
                    "img": "9d892394-e99f-409c-818f-93e007c1d204.jpg",
                    "typeId": 1,
                    "brandId": 1
                },
                {
                    "id": 3,
                    "name": "Siem-009",
                    "price": 1250,
                    "rate": 0,
                    "img": "07c3b5e3-8399-4c4b-819c-4f2766ab3423.jpg",
                    "typeId": 1,
                    "brandId": 1
                },
                {
                    "id": 4,
                    "name": "lg001",
                    "price": 750,
                    "rate": 0,
                    "img": "b04984b3-63bc-4629-8539-0c6e1e2fa500.jpg",
                    "typeId": 1,
                    "brandId": 2
                },
                {
                    "id": 5,
                    "name": "lg50",
                    "price": 900,
                    "rate": 0,
                    "img": "571c265d-7c57-465f-be6a-0232c048c28a.jpg",
                    "typeId": 1,
                    "brandId": 2
                },
                {
                    "id": 6,
                    "name": "lg9089",
                    "price": 550,
                    "rate": 0,
                    "img": "5744a589-c07d-4a04-8930-38122170cf9a.jpg",
                    "typeId": 1,
                    "brandId": 2
                },
                {
                    "id": 7,
                    "name": "Iphone11",
                    "price": 550,
                    "rate": 0,
                    "img": "f4befa09-8bab-4139-914b-6c29837c7cfd.jpg",
                    "typeId": 2,
                    "brandId": 4
                },
                {
                    "id": 8,
                    "name": "Iphone12",
                    "price": 750,
                    "rate": 0,
                    "img": "6ec7fdf7-3382-4620-9e08-6d28c107f0c9.jpg",
                    "typeId": 2,
                    "brandId": 4
                },
                {
                    "id": 9,
                    "name": "Nokia-6300",
                    "price": 150,
                    "rate": 0,
                    "img": "dbc820f5-6ebd-4464-a984-a2d117aca5d2.jpg",
                    "typeId": 2,
                    "brandId": 5
                }
            ]
        }
        makeAutoObservable(this);
    }
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices){
        this._devices = devices;
    }
    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get devices(){
        return this._devices;
    }
}