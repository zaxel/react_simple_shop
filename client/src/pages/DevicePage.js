import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleDevice } from '../http/deviceAPI';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import DeviceGallery from '../components/device/DeviceGallery';
import RateItem from '../components/device/RateItem';
import { SHOP_ROUTE } from '../utils/consts/routes';
import DeviceBuyCont from '../components/device/DeviceBuyCont';
import { formatUSCurrency } from '../utils/dataFormat/currencies';
import SellerDescription from '../components/device/SellerDescription';

const DevicePage = () => {
	const [device, setDevice] = useState({});
	const [loading, setLoading] = useState(false);

	let { id } = useParams();
	useEffect(() => {
		setLoading(true);
		fetchSingleDevice(id)
			.then((data) => {
				setDevice(data);
			})
			.catch((err) => {
				console.log(err.message);
			})
			.finally(()=>setLoading(false));
	}, [id]);

	if (device === null || device === 'error') return <ErrorPage />;
	if(loading){
		return <div className="flex-auto w-full h-[92dvh] flex justify-center items-center">
					<Spinner  className="w-8 h-8"/>
				</div>
	}


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
							<h2 className='device__price'>{formatUSCurrency(device.price)}</h2>
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
					<DeviceBuyCont device={device} />
				</div>
				<SellerDescription device={device} />
			</div>
		</div>
	);
};

export default DevicePage;
