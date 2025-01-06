import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../..';
import Topic from './Topic';

const Topics = observer(() => {
    const {helpPage} = useContext(Context);
    
    const topics = helpPage.categories
        .filter(card=>card.title!=="Search Result")
        .map(card => <Topic key={card.id} {...card} />)
    return (
        <>
            <ul className='help-aside__topics topic-aside'>
                <li><h3 className='aside-h3'>FAQ topics</h3></li>
                {topics}
            </ul>
        </>
    );
});

export default Topics;