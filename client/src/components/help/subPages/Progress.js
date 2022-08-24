import React from 'react';

const Progress = () => {
    return (
        <div className='cat-list__progress'>
            <label for="help__progress">You've viewed 12 of 38 FAQs</label>
            <progress id="help__progress" max="100" value="30" >30%</progress>
        </div>
    );
};

export default Progress;