import React from 'react';
import AboutBlock from './AboutBlock';
const  AboutBlocks = ({blocksData}) => {
    const blocks = blocksData.map(block=><AboutBlock key={block.id} {...block}/>)
    return (
        <div className='sub-about__blocks'>
            {blocks}
        </div>
    );
};

export default AboutBlocks;