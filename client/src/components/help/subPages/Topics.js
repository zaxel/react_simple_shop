import React, { useContext } from 'react';
import { Context } from '../../..';
import Topic from './Topic';

const Topics = () => {
    const {helpPage} = useContext(Context);
    
    const topics = helpPage.categories.map(card => <Topic key={card.id} {...card} />)
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