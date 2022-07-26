import React, { useState, useRef, useContext, useEffect } from 'react';
import ThAdminTypesTooltip from './tableComponents/ThAdminTypesTooltip';
import TrTypes from './tableComponents/TrTypes';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchPage } from '../../../utils/adminTypes';

const TypesAdminPanel = observer(() => {
    let thRefs = useRef([]);
    const { toolTip, types } = useContext(Context);

    useEffect(() => {
        (async () => {
            try {
                await fetchPage(types);
            } catch (e) {
                console.log(e)
            }
        })()
        toolTip.setIsAvailable(true);

    }, [])

    useEffect(() => {
        fetchPage(types);
    }, [types.updateDataTrigger])

    const ths = [
        { title: 'id', sortBy: 'id' },
        { title: 'type', sortBy: 'name' },
        { title: 'created', sortBy: 'createdAt' },
        { title: 'last updated', sortBy: 'updatedAt' },
        { title: 'destroy', sortBy: null },
    ]


    const tds = [
        { id: 18, name: 'tv', createdAt: 1519211809934, updatedAt: 1519211809934 },
        { id: 22, name: 'tv', createdAt: 1519211810362, updatedAt: 1519211810362 },
        { id: 56, name: 'tv', createdAt: 1519211811670, updatedAt: 1519211811670 },
        { id: 75, name: 'tv', createdAt: 1519211809934, updatedAt: 1519211809934 },
        { id: 29, name: 'tv', createdAt: 1519129853500, updatedAt: 1519129853500 },
        { id: 11, name: 'tv', createdAt: 1519129858900, updatedAt: 1519129858900 },
        { id: 12, name: 'tv', createdAt: 1519129864400, updatedAt: 1519129864400 },
    ]

    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
        return <ThAdminTypesTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })


    // const trs = tds.map((el, i) => {
    const trs = types.types.map((el, i) => {
        return <TrTypes key={el.id} data={el} />
    })


    if (types.loading) {
        return (
            <div className="spinner">
                <Spinner animation="border" />
            </div>
        )
    }


    return (
        <div className='user-admin__main account__orders acc-orders'>
            <div>
                <table className='stripped-table'>
                    <thead>
                        <tr>
                            {thsWithTooltip}
                        </tr>
                    </thead>
                    <tbody>
                        {trs}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default TypesAdminPanel;