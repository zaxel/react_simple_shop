import React from 'react';

const withTooltip = WrappedComponent = ({props}) => {
    <WrappedComponent {...props}/>
    console.log(8898)
    return withTooltip;

    
};

export default withTooltip;