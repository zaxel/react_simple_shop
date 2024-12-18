export const BrandsThs = [
    { title: 'id', sortBy: 'id' },
    { title: 'brand', sortBy: 'name' },
    { title: 'created', sortBy: 'createdAt' },
    { title: 'last updated', sortBy: 'updatedAt' },
    { title: 'destroy', sortBy: null },
]

export const DevicesThs = [
    { title: 'id', sortBy: 'id' },
    { title: 'name', sortBy: 'name' },
    { title: 'price', sortBy: 'price' },
    { title: 'rate', sortBy: 'rate' },
    { title: 'image', sortBy: null },
    { title: 'created', sortBy: 'createdAt' },
    { title: 'type', sortBy: 'typeId' },
    { title: 'brand', sortBy: 'brandId' },
    { title: 'seller description', sortBy: null },
    { title: 'specifications', sortBy: null },
    { title: 'destroy', sortBy: null },
]

export const DeviceInfoThs = [
    { title: 'title', sortBy: 'title' },
    { title: 'description', sortBy: null },
    { title: 'destroy', sortBy: null },
];

export const OrderThs = [
    { title: 'order id', sortBy: 'id' },
    { title: 'ordered at', sortBy: 'createdAt' },
    { title: 'items ordered', sortBy: null },
    { title: 'user id', sortBy: 'userId' },
    { title: 'user email', sortBy: null },
    { title: 'total', sortBy: null },
    { title: 'order detail', sortBy: null },
    { title: 'destroy', sortBy: null },
]

export const OrderDetailsThs = [
    {title: 'device id', sortBy: 'id'}, 
    {title: 'title', sortBy: 'name'}, 
    {title: 'amount ordered', sortBy: null}, 
    {title: 'rate', sortBy: 'rate'}, 
    {title: 'price', sortBy: 'price'}, 
];

export  const TypesThs = [
    { title: 'id', sortBy: 'id' },
    { title: 'type', sortBy: 'name' },
    { title: 'created', sortBy: 'createdAt' },
    { title: 'last updated', sortBy: 'updatedAt' },
    { title: 'destroy', sortBy: null },
]

export const UsersThs = [
    { title: 'user id', sortBy: 'id' },
    { title: 'email', sortBy: 'email' },
    { title: 'role', sortBy: 'role' },
    { title: 'activated', sortBy: 'is_activated' },
    { title: 'registered', sortBy: 'createdAt' },
    { title: 'orders', sortBy: null },
    { title: 'destroy', sortBy: null },
]

export const UserOrdersThs = [
    {title: 'order id', sortBy: 'id'}, 
    {title: 'ordered at', sortBy: 'createdAt'}, 
    {title: 'amount ordered', sortBy: null}, 
    {title: 'total', sortBy: null}, 
];