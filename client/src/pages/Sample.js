import React from 'react';

const Sample = () => {
    const example = [
        {
            "name": "Siemens",
            "price": 930.25,
            "rate": 5.0,
            "brandId": 1,
            "typeId": 6,
            "images": ["image1.jpg", "image2.jpg", "image3.jpg"],
            "info": [
                { "title": "size", "description": "L" },
                { "title": "color", "description": "black" },
                { "title": "Status", "description": "Available. Released 2021, January 29" }],
            "seller_description": "some seller description1"
        },
        {
            "name": "Nokia",
            "price": 10.90,
            "rate": 3.2,
            "brandId": 8,
            "typeId": 2,
            "images": ["image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg"],
            "info": [
                { "title": "size", "description": "L" },
                { "title": "color", "description": "black" },
                { "title": "Status", "description": "Available. Released 2021, January 29" },
                { "title": "Dimensions", "description": "151.7 x 71.2 x 7.9 mm (5.97 x 2.80 x 0.31 in)" },
                { "title": "Weight", "description": "169 g (Sub6), 171 g (mmWave) (5.96 oz)" },
                { "title": "Build", "description": "Glass front (Gorilla Glass Victus), plastic back, aluminum frame" },
                { "title": "OS", "description": "Android 11, One UI 3.1" },
                { "title": "Chipset", "description": "Exynos 2100 (5 nm) - International" },
                { "title": "GPU", "description": "Adreno 660 - USA/China" },
                { "title": "Card slot", "description": "No" },
                { "title": "Internal", "description": "128GB 8GB RAM, 256GB 8GB RAM" },
                { "title": "Loudspeaker", "description": "Yes, with stereo speakers" },
                { "title": "Bluetooth", "description": "5.0, A2DP, LE" }
            ],
            "seller_description": "some seller description2"
        }
    ]
    return (
        <div className='sample'>
            <pre>{JSON.stringify(example, null, 4)}</pre>
        </div>
    );
};

export default Sample;