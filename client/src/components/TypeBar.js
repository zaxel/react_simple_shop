import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const TypeBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className='typebar'>
            <ul className="list-group">
                {device.types.map(li_item => {
                   return <li
                    key={li_item.id} 
                    onClick={()=>{
                        device.setTypeActive(li_item.id);
                        device.setActivePage(1);
                        }}
                    className={"list-group-item" + (device.typeActive === li_item.id ? ' active' : '')}>{li_item.name}</li>
                })}
            </ul>
        </div>
    );
});

export default TypeBar;