import React from 'react';
import { ABOUT_ROUTE } from '../../../utils/consts/routes';
import { Link } from 'react-router-dom';
import arrow_right from '../../../assets/icons/arrow-right.svg';

const CategoryList = () => {
    return (
        <ul className='popular-cont__cards cat-list'>
                <li>
                    <p>38 FAQs</p>
                </li>
                <li>
                    <Link to={ABOUT_ROUTE}>
                        <p>International deliveries</p>
                        <div className='popular-cont__arrow-right'>
                            <img src={arrow_right} alt='arrow right button'></img>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={ABOUT_ROUTE}>
                        <p>International deliveries</p>
                        <div className='popular-cont__arrow-right'>
                            <img src={arrow_right} alt='arrow right button'></img>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={ABOUT_ROUTE}>
                        <p>International deliveries</p>
                        <div className='popular-cont__arrow-right'>
                            <img src={arrow_right} alt='arrow right button'></img>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={ABOUT_ROUTE}>
                        <p>International deliveries</p>
                        <div className='popular-cont__arrow-right'>
                            <img src={arrow_right} alt='arrow right button'></img>
                        </div>
                    </Link>
                </li>
            </ul>
    );
};

export default CategoryList;