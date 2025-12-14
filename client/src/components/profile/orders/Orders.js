import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from './Data-Table';
import { columns } from './columns';

const resp = {
    "count": 38,
    "rows": [
        {
            "id": 47,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757929742000,
            "amountOrdered": 1,
            "userId": 93,
            "email": "admin@gmail.com",
            status: "completed",
            "total": 142.49,
        },
        {
            "id": 48,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757929792000,
            "amountOrdered": 2,
            "userId": 93,
            "email": "admin@gmail.com",
            status: "failed",
            "total": 968
        },
        {
            "id": 49,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757929925000,
            "amountOrdered": 4,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "completed",
            "total": 92.92,
        },
        {
            "id": 50,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757929983000,
            "amountOrdered": 3,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "failed",
            "total": 2080.99
        },
        {
            "id": 51,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757930094000,
            "amountOrdered": 6,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "in progress",
            "total": 5087.06
        },
        {
            "id": 52,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757930130000,
            "amountOrdered": 1,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "completed",
            "total": 273
        },
        {
            "id": 53,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757930161000,
            "amountOrdered": 1,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "completed",
            "total": 2550
        },
        {
            "id": 54,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757930183000,
            "amountOrdered": 4,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "in progress",
            "total": 380.62
        },
        {
            "id": 67,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757929742000,
            "amountOrdered": 1,
            "userId": 93,
            "email": "admin@gmail.com",
            status: "completed",
            "total": 142.49,
        },
        {
            "id": 68,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757929792000,
            "amountOrdered": 2,
            "userId": 93,
            "email": "admin@gmail.com",
            status: "failed",
            "total": 968
        },
        {
            "id": 69,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757929925000,
            "amountOrdered": 4,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "completed",
            "total": 92.92,
        },
        {
            "id": 70,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757929983000,
            "amountOrdered": 3,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "failed",
            "total": 2080.99
        },
        {
            "id": 71,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757930094000,
            "amountOrdered": 6,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "in progress",
            "total": 5087.06
        },
        {
            "id": 72,
            "title": "Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover",
            "brand": "Beco",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s",
            "createdAt": 1757930130000,
            "amountOrdered": 1,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "completed",
            "total": 273
        },
        {
            "id": 73,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757930161000,
            "amountOrdered": 1,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "completed",
            "total": 2550
        },
        {
            "id": 74,
            "title": "Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000",
            "brand": "Samsung",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s",
            "createdAt": 1757930183000,
            "amountOrdered": 4,
            "userId": 90,
            "email": "ViewOnlyAdmin@gmail.com",
            status: "in progress",
            "total": 380.62
        },
    ]
}


const Orders = () => {
    return (
        <div className=''>
            <div className='mb-8 px-4 py-2 bg-primary-foreground rounded-lg'>
                <h1 className='font-semibold '>Your Orders</h1>
            </div>
            <DataTable data={resp.rows} columns={columns}/>
        </div>
    );
};

export default Orders;