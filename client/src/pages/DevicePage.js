import React from 'react';
import bigStar from '../assets/rating_star_b.png';
import star from '../assets/rating_star.png';
import imagePlug from '../assets/iPhone11.jpg';

const DevicePage = () => {
    const device = {
        id: 3,
        name: "Siem-009 dfda dafahdifh jdf",
        price: 1250,
        rate: 4.3,
        img: imagePlug,
        typeId: 1,
        brandId: 1
    }
    const specification = [
        {id: 1, title: 'Technology', descr: 'GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2 (Dual SIM model only)'},
        {id: 2, title: 'Announced', descr: '2021, January 14'},
        {id: 3, title: 'Status', descr: 'Available. Released 2021, January 29'},
        {id: 4, title: 'Dimensions', descr: '151.7 x 71.2 x 7.9 mm (5.97 x 2.80 x 0.31 in)'},
        {id: 5, title: 'Weight', descr: '169 g (Sub6), 171 g (mmWave) (5.96 oz)'},
        {id: 6, title: 'Build', descr: 'Glass front (Gorilla Glass Victus), plastic back, aluminum frame'},
        {id: 7, title: 'OS', descr: 'Android 11, One UI 3.1'},
        {id: 8, title: 'Chipset', descr: 'Exynos 2100 (5 nm) - International'},
        {id: 9, title: 'GPU', descr: 'Adreno 660 - USA/China'},
        {id: 10, title: 'Card slot', descr: 'No'},
        {id: 11, title: 'Internal', descr: '128GB 8GB RAM, 256GB 8GB RAM'},
        {id: 12, title: 'Loudspeaker', descr: 'Yes, with stereo speakers'},
        {id: 13, title: 'Bluetooth', descr: '5.0, A2DP, LE'},
        {id: 14, title: 'USB', descr: 'USB Type-C 3.2, USB On-The-Go'},
        {id: 15, title: 'Display', descr: 'Contrast ratio: Infinite (nominal)'},
    ]
    return (
        <div className='device'>
            <div className='device__cont'>
                <div className='device__main-cont'>
                    <div className='device__img-cont'>
                        <img src={device.img} alt='item photo'/>
                    </div>
                    <div className='device__title-cont'>
                        <h2>{device.name}</h2>
                        <div className='device__star-cont' style={{background: `url(${bigStar}) no-repeat center center / contain`}}>
                            <img src={star} alt='rating star'/>{device.rate} 
                        </div>
                        
                    </div>
                    <div className='device__price-cont'>
                        <h2>${device.price}</h2>
                        <button className='btn btn-outline-light auth__button device__button'>add to basket</button>
                    </div>
                </div>
                <div className='device__specification'>
                    <h2>Specifications:</h2>
                    <ul>
                        {specification.map(spec => 
                            <li key={spec.id}>{spec.title}: {spec.descr}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DevicePage;