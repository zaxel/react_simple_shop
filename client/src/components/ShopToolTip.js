﻿import React, {useContext, useEffect, useRef} from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const ShopToolTip = observer(() => {



    const {toolTip} = useContext(Context);

    const tooltipRef = useRef(null);

    const setToolTipPosition = () => {
        
        tooltipRef.current.style.top = toolTip.top + 'px';
        tooltipRef.current.style.left = toolTip.left + 'px';
        tooltipRef.current.style.opacity = 1;


    }
    useEffect(()=>{
        
        // toolTip.isToolTipShown && setToolTipPosition();
        tooltipRef.current.offsetWidth && toolTip.setOffsetWidth(tooltipRef.current.offsetWidth);
        tooltipRef.current.offsetHeight && toolTip.setOffsetHeight(tooltipRef.current.offsetHeight);
        
        console.log('offsetWidth: ', tooltipRef.current.offsetWidth)
        console.log('offsetHeight: ', tooltipRef.current.offsetHeight)
        
        toolTip.setIsToolTipShown(false)

    }, [])


    

    useEffect(()=>{
        
        toolTip.isToolTipShown && setToolTipPosition();
    }, [toolTip.isToolTipShown])


    return (
        toolTip.isToolTipShown && <div ref={tooltipRef} className='tool-tip'>
            {toolTip.toolTipText}
        </div>
        // toolTip.isToolTipShown && <div ref={tooltipRef} className='tool-tip'>
        //     {toolTip.toolTipText}
        // </div>
    );
});

export default ShopToolTip;