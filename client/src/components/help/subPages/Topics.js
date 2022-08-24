import React from 'react';
import { helpCategories } from '../../../utils/consts/helpPageData';
import Topic from './Topic';

const Topics = () => {
    const topics = helpCategories.map(card => <Topic key={card.id} {...card} />)
    return (
        <>
            
            <ul className='help-aside__topics topic-aside'>
                <li><h3 className='aside-h3'>FAQ topics</h3></li>
                {topics}
            </ul>
        </>
    );
};

export default Topics;