import React from 'react';
import { Route } from "react-router-dom";
import { profileRoutes } from '../../routes';
import ProfileInfo from './info/Info';

const ProfileRouter = () => {
    const routs = profileRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component />
        } />
    })
    routs.push(<Route key={Date.now()} index element={<ProfileInfo />} />)
    return routs;
};

export default ProfileRouter;