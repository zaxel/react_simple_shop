import React from 'react';
import { Link } from 'react-router-dom';
import { HELP_CAT_ROUTE } from '../../../utils/consts/routes';

const Topic = ({ link, icon, title }) => {
    return (
        <li>
            <div className='topic-aside__icon'>
                <img src={process.env.REACT_APP_API_URL + icon} alt="help topic icon" />
            </div>
            <Link to={HELP_CAT_ROUTE + link}>{title}</Link>
        </li>
    );
};

export default Topic;