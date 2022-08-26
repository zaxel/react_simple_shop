import React from 'react';

const Progress = ({count, total}) => {
    return (
        <div className='cat-list__progress'>
            <label htmlFor="help__progress">You've viewed {count} of {total} FAQs</label>
            <progress id="help__progress" max="100" value="30" >30%</progress>
        </div>
    );
};

export default Progress;