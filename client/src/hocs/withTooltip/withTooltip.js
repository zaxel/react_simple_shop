import React, { useEffect, useContext } from 'react';
import { HoverIntent } from './hoverIntent';
import { Context } from '../..';


const withTooltip = Component => ({ ...props }) => {

    const {toolTip} = useContext(Context);

    

    const toolTipHandler = () => {
        const i = props.iteration;
        const myRefs = props.myRefs;
        const elem = myRefs.current[i];
        const text = props.text;
        console.log(toolTip.isToolTipShown)


        setTimeout(function() {
            new HoverIntent({
                elem,
                toolTip,
                text
            });
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
