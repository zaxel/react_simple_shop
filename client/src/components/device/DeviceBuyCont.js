import React from 'react';
import DeviceBuy from './DeviceBuy';
import DeviceBuyAddToList from './DeviceBuyAddToList';
import DeviceBuyOtherSellers from './DeviceBuyOtherSellers';

const DeviceBuyCont = ({device}) => {
	return (
		<div className="device__buy-cont">
			<DeviceBuy device={device} />
			<DeviceBuyAddToList />
			<DeviceBuyOtherSellers />
		</div>
	);
};

export default DeviceBuyCont;
