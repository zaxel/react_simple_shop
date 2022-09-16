import React from 'react';
import AboutBlock from './AboutBlock';
const  AboutBlocks = ({blocksData}) => {
    const blocks = blocksData.sort((a,b)=>a.position-b.position).map(block=><AboutBlock key={block.id} {...block}/>)
    return (
        <div className='sub-about__blocks'>
            {blocks}
        </div>
    );
};

export default AboutBlocks;