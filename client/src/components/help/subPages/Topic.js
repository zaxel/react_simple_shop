import React from 'react';
import { Link } from 'react-router-dom';

const Topic = ({ link, icon, title }) => {
    return (
        <li>
            <div className='topic-aside__icon'>
                <img src={icon} alt="help topic icon" />
            </div>
            <Link to={link}>{title}</Link>
        </li>
    );
};

export default Topic;