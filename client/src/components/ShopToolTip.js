import React, {useContext, useEffect, useRef} from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const ShopToolTip = observer(() => {
    const {toolTip} = useContext(Context);
    const tooltipRef = useRef(null);

    const setToolTipPosition = () => {
        tooltipRef.current.style.top = toolTip.top + 'px';
        tooltipRef.current.style.left = toolTip.left + 'px';
        tooltipRef.current.style.opacity = 1;

        //does not show tooltip if it shown in left top corner(crutch). in most cases those coordinates not what we expected, it is just side effect.
        if (toolTip.top < 10 || toolTip.left < 10)
            tooltipRef.current.style.opacity = 0;
    }
    useEffect(()=>{
        toolTip.setIsToolTipShown(false)
    }, [])

    useEffect(()=>{
        toolTip.isToolTipShown && setToolTipPosition();
    }, [toolTip.isToolTipShown])

    return (
        toolTip.isToolTipShown && <div ref={tooltipRef} className='tool-tip'>
            {toolTip.toolTipText}
        </div>
    );
});

export default ShopToolTip;