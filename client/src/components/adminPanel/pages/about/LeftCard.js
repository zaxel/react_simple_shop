import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';
import CommonCard from './CommonCard';

const LeftCard = observer(() => {
    

    // if (aboutPage.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <CommonCard cardId={1}/>
    );
});

export default LeftCard;