import React, { useEffect, useContext } from 'react';
import { Context } from '../../../../..';
import withTooltip from '../../../../../hocs/withTooltip/withTooltip';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ data, innerRef }) => {


    const { linkText } = data;
    const { toolTip } = useContext(Context);

    useEffect(() => {
        //   destroy all event listeners tooltips
        return () => toolTip?.hoverIntentDestroy();
    }, [])

    return (
        <td ref={innerRef}>
            <NavLink className="table__link" to="/">{linkText}</NavLink>
        </td>
    );
};

export default withTooltip(NavigationLink);