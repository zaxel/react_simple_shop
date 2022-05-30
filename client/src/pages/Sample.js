import React from 'react';

const Sample = () => {
    const example = [
        {
          name: 'new Item',
          price: 50,
          rate: 4.2,
          brandId: 10,
          typeId: 5,
          img: 'image.jpg',
          info:
            [
              {
                title: 'size',
                description: 'L'
              },
              {
                title: 'color',
                description: 'black'
              },
            ]
        },
        {
          name: 'new Item2',
          price: 100,
          rate: 3.2,
          brandId: 11,
          typeId: 6,
          img: 'image2.jpg',
          info:
            [
              {
                title: 'size',
                description: 'XL'
              },
              {
                title: 'color',
                description: 'white'
              },
              {
                title: 'style',
                description: 'MODERATORn'
              },
            ]
        },
      ]
    return (
        <div className='sample'>
            <pre>{JSON.stringify(example, null, 4)}</pre>
        </div>
    );
};

export default Sample;