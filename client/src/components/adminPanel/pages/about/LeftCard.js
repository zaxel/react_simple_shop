import React, { useContext, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';
import { Context } from '../../../..';
import CommonCard from './CommonCard';

const LeftCard = () => {
    const {aboutPage} = useContext(Context);

    if (aboutPage.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <CommonCard cardId={1}/>
    );
};

export default LeftCard;