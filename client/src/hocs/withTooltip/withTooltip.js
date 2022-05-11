import React, { useEffect } from 'react';


const withTooltip = Component => ({ ...props }) => {



    useEffect(()=>{
        const i = props.iteration;
        const myRefs = props.myRefs;
        console.log(myRefs.current[i].getBoundingClientRect().top)
    },[])
    return(
        <Component {...props} />
    )
}
    
  



export default withTooltip;
