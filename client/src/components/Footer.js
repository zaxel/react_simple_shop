import React, { useContext } from 'react';
import usFlag from '../assets/usflag.png';
import { HELP_ROUTE, SHOP_ROUTE } from '../utils/consts/routes';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { observer } from 'mobx-react-lite';

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    return (
        <footer className='text-navbar-text bg-dark'>
            <section className='h-14 bg-navbar-background px-4'>
                <button onClick={scrollTop} className='h-full w-full'>
                    Back to top
                </button>
            </section>
            <section className='flex flex-wrap flex-col sm:flex-row justify-evenly items-start p-4 gap-4'>
                <nav>
                    <h2 className='text-base font-semibold'>Get to Know Us</h2>
                    <ul className="flex-col gap-2">
                        <li className="nav-item ">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Careers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>About Arazon</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Investor Relations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Amazon Devices</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Amazon Science</Link>
                        </li>

                    </ul>
                </nav>
                <nav>
                    <h2 className='text-base font-semibold'>Make Money with Us</h2>
                    <ul className="flex-col gap-2">
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Sell products on Arazon</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Sell on Arazon Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Sell apps on Arazon</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Become an Affiliate</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Advertise Your Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Self-Publish with Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Host an Arazon Hub</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>›See More Make Money with Us</Link>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <h2 className='text-base font-semibold'>Amazon Payment Products</h2>
                    <ul className="flex-col gap-2">
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Arazon Business Card</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Shop with Points</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Reload Your Balance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Arazon Currency Converter</Link>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <h2 className='text-base font-semibold'>Let Us Help You</h2>
                    <ul className="flex-col gap-2">
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Amazon and COVID-19</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Your Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Your Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Shipping Rates & Policies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Returns & Replacements</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Manage Your Content and Devices</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-sm text-navbar-text hover:text-navbar-text-hover" to={HELP_ROUTE}>Help</Link>
                        </li>
                    </ul>
                </nav>
            </section>
            <hr className='bg-navbar-text w-full'/>

            <section className='hidden text-white p-4 gap-32 md:flex justify-center items-center'>
                <div>
                    <Link className="navbar-brand hover:text-navbar-text-hover" to={SHOP_ROUTE}>Arazone</Link>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <div className="flex justify-center flex-grow-0 items-center gap-4 p-2 border border-white rounded-md"><Globe /> <span>English</span></div>
                    <div className="p-2 border border-white rounded-md">$ USD - U.S. Dollar</div>
                    <div className="flex justify-center flex-grow-0 items-center gap-4 p-2 border border-white rounded-md"><img className='w-6 h-6' src={usFlag} alt="usa flag" /> <span>United States</span></div>
                </div>
            </section>
        </footer>
    );
};

export default observer(Footer);