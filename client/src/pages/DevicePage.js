import React, { useContext, useEffect, useState } from 'react';
import bigStar from '../assets/rating_star_b.png';
import star from '../assets/rating_star.png';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchSingleDevice } from '../http/deviceAPI';
import { Spinner } from 'react-bootstrap';
import { addToCart } from '../utils/cart/addToCart';
import { Context } from '..';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import DeviceGallery from '../components/DeviceGallery';
import RateItem from '../components/RateItem';
import { SHOP_ROUTE } from '../utils/consts/routes';

const DevicePage = () => {
	const [device, setDevice] = useState({});
	const { user, cart } = useContext(Context);
	const device_amount = 1;

	let { id } = useParams();
	useEffect(() => {
		fetchSingleDevice(id)
			.then((data) => {
				setDevice(data);
			})
			.catch((err) => {
				console.log(err.message);
				setDevice('error');
			});
	}, []);

	if (device === null || device === 'error') return <ErrorPage />;

	return (
		<div className="device">
			<div className="device__cont">
				<div className="device__main-cont">
					{Object.keys(device).length === 0 ? (
						<div className="device__img-cont">
							<div className="spinner">
								<Spinner animation="border" />
							</div>
						</div>
					) : (
						<div className="device__img-cont">
                            <div className='device__imgcont-wrapper'>
    							<DeviceGallery device={device} />
                            </div>
						</div>
					)}
					<div className="device__info-cont">
						<div className="device__title-cont">
							<h2 className='device__title'>{device.name}</h2>
							<Link className='device__shop-link' to={SHOP_ROUTE}>
								<h5>Visit the Arazone basic store</h5>
							</Link>
							<div className="device__star-cont">
								<RateItem rate={device.rate} />
							</div>
							<div className="device__amount-bought">
								<span>2K+ bought</span> in past month
							</div>
						</div>
						<div className="device__price-cont">
							<h2 className='device__price'>${device.price}</h2>
							<p className="device__price-lower">
								Available at a lower price from <Link to={SHOP_ROUTE}>other sellers</Link> that may not offer free Prime delivery.
							</p>
							<h5 className="device__items-left">Only 12 left in stock.</h5>
						</div>
						<div className="device__specification dev-spec">
							<table>
                                <tbody>
								    {device.info?.map((spec) => (
									    <tr key={spec.id}>
										    <td className='dev-spec__title'>{spec.title}</td> 
										    <td className='dev-spec__descr'>{spec.description}</td> 
									    </tr>
								    ))}
                                </tbody>
							</table>
						</div>
					</div>
					<aside className="device__buy-cont">
						<h2>Buy and rest</h2>
						<button
							onClick={() =>
								addToCart(cart, user, user.isAuth, cart.cartId, device.id, device_amount, user.user.id)
							}
							className="btn btn-outline-light auth__button device__button"
						>
							add to basket
						</button>
					</aside>
				</div>
				<div className="device__seller-deskr">
					<h2>About this item:</h2>
                    {device.seller_dscr && <iframe src={device.seller_dscr} width="100%" height="1440px" title="seller description"/>}
                </div>
			</div>
		</div>
	);
};

export default DevicePage;
