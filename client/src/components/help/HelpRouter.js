import React from 'react';
import { Route } from "react-router-dom";
import { helpRoutes } from '../../routes';
import HelpMain from './subPages/HelpMain';

const HelpRouter = () => {

    const helpComponents = helpRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
            <Component path={path}/>
        } />
    })
    helpComponents.push(<Route key={Date.now()} index element={<HelpMain/>} />)
    return helpComponents;
};

export default HelpRouter;