import React, { useEffect, useContext } from 'react';
import { HoverIntent } from '../../utils/toolTipServing/hoverIntent';
import { Context } from '../..';


const withTooltip = Component => ({ ...props }) => {
    const {toolTip} = useContext(Context);

    const toolTipHandler = () => {
        const i = props.toolTipInfo.i;
        const myRefs = props.toolTipInfo.myRefs;
        const elem = myRefs.current[i];
        const text = props.toolTipInfo.text;

        setTimeout(function() {
            const hoverIntent = new HoverIntent({
                elem,
                toolTip,
                text
            });
            toolTip.setHoverIntentDestroy(hoverIntent.destroy);
          }, 1000);
    }


    useEffect(()=>{
        toolTipHandler();
    },[])
    return(
        <Component {...props} />
    )
}
    
  



export default withTooltip;
