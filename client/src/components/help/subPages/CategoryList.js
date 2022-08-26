import React from 'react';

const CategoryList = ({ faqs, page, items }) => {
    return (
        <ul className='popular-cont__cards cat-list'>
            <li>
                <p>{faqs.length} FAQs</p>
            </li>
            {items}
        </ul>
    );
};

export default CategoryList;