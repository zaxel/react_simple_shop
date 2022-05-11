import React, {useContext} from 'react';
import { Context } from '..';

const ShopToolTip = () => {
    const {toolTip} = useContext(Context);
    console.log(toolTip.isToolTipShown)

    return (
        toolTip.isToolTipShown && <div className='tool-tip'>
            {toolTip.toolTipText}
        </div>
    );
};

export default ShopToolTip;