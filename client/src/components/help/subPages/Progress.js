import React from 'react';

const Progress = ({count, total}) => {
    const getValuePercentage = () => {
        if(count === total)return 100;
        return Math.floor(count/total*100)
    }
    const percentVal = getValuePercentage()
    return (
        <div className='cat-list__progress'>
            <label htmlFor="help__progress">You've viewed {count} of {total} FAQs</label>
            <progress id="help__progress" max="100" value={percentVal} >{percentVal}%</progress>
        </div>
    );
};

export default Progress;