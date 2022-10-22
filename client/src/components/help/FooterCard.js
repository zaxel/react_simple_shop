import React from 'react';
import { Link } from 'react-router-dom';
import arrow_right from "../../assets/icons/arrow-right.svg"
import { HELP_FAQ_ROUTE } from '../../utils/consts/routes';
import { stringToQuery } from '../../utils/dataFormat/stringToQuery';

const FooterCard = ({id, question, link}) => {
    return (
        <li>
            <Link to={HELP_FAQ_ROUTE + '/' + stringToQuery(question)}>
                <p>{question}</p>
                <div className='popular-cont__arrow-right'>
                    <img src={arrow_right} alt='arrow right button'></img>
                </div>
            </Link>
        </li>
    );
};

export default FooterCard;