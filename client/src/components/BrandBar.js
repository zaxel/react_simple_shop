import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className='brandBar'>
            <ul className="list-group">
            
            {device.brands.map(brand => {
               return <li
                key={brand.id} 
                onClick={()=>{
                    device.setBrandActive(brand.id);
                    device.setActivePage(1);
                }}
                className={"brandBar__li" + (device.brandActive === brand.id ? ' active' : '')}>{brand.name}</li>
            })}
        </ul>
        </div>
    );
});

export default BrandBar;