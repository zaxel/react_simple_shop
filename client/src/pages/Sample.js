import React from 'react';

const Sample = () => {
    const example = [
      {
          "name": "new device",
          "price": 50,
          "rate": 4.2,
          "brandId": 6,
          "typeId": 2,
          "img": "no-image.jpg",
          "info": [
              {
                  "title": "size",
                  "description": "L"
              },
              {
                  "title": "color",
                  "description": "black"
              }
          ]
      },
      {
          "name": "another device",
          "price": 100,
          "rate": 3.2,
          "brandId": 5,
          "typeId": 7,
          "img": "no-image.jpg",
          "info": [
              {
                  "title": "size",
                  "description": "XL"
              },
              {
                  "title": "color",
                  "description": "white"
              },
              {
                  "title": "style",
                  "description": "MODERATORn"
              }
          ]
      }
  ]
    return (
        <div className='sample'>
            <pre>{JSON.stringify(example, null, 4)}</pre>
        </div>
    );
};

export default Sample;