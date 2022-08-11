import React, { useState, useRef, useContext, useEffect } from 'react';
import ThAdminBrandsTooltip from './tableComponents/ThAdminBrandsTooltip';
import TrBrands from './tableComponents/TrBrands';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchPage, addNewBrands as addNewBrandsReq } from '../../../utils/administration/adminBrands';
import TrBrandsNewLine from './tableComponents/TrBrandsNewLine';

const BrandsAdminPanel = observer(() => {
    let thRefs = useRef([]);
    const { toolTip, brands, cart, user } = useContext(Context);

    useEffect(() => {
        (async () => {
            try {
                await fetchPage(brands);
                toolTip.setIsAvailable(true);
            } catch (e) {
                console.log(e)
            }
        })()

    }, [])

    useEffect(() => {
        fetchPage(brands);
    }, [brands.updateDataTrigger])

    const ths = [
        { title: 'id', sortBy: 'id' },
        { title: 'brand', sortBy: 'name' },
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

    const addNewBrands = () => {
        const id = uuidv4();
        brands.addNewBrandsLine(id);
    }
    const dropNewLine = (id) => {
        brands.dropNewBrandsLine(id);
    }
    const triggerBrandsUpdate = () => {
        brands.setUpdateDataTrigger(!brands.updateDataTrigger);
    }
    const onSaveClickHandler = async () => {
        const newLinesNoEmptyFields = brands.newBrands
            .filter(el => el.name !== '')
            .map(el => {
                return { name: el.name };
            })

        if (!newLinesNoEmptyFields.length) {
            alert('no data to be updated');
            brands.refreshNewInfo();
            return;
        }
        const { loggedOut } = await addNewBrandsReq(newLinesNoEmptyFields, cart, user);
        if(loggedOut)return;
        brands.refreshBrands();
        triggerBrandsUpdate();
    }

    const thsWithTooltip = ths.map((el, i) => {

        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
        return <ThAdminBrandsTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })


    // const trs = tds.map((el, i) => {
    const trs = brands.brands.map((el, i) => {
        return <TrBrands key={el.id} data={el} />
    })
    const trsNewLine = brands.newBrands?.map((el, i) => {
        return <TrBrandsNewLine key={el.id} data={{ el, dropNewLine }} />
    })


    if (brands.loading) {
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
                    <tfoot>
                        {trsNewLine}
                    </tfoot>
                </table>
                <div className='addBrands-buttons__container'>
                    <button className="admin-device__add-button" onClick={addNewBrands}>
                        Add new brand line
                    </button>
                    {!!brands.newBrands.length && <button className='alert-button-self' onClick={onSaveClickHandler}>
                        Save new brand lines
                    </button>}
                </div>
            </div>

        </div>
    );
});

export default BrandsAdminPanel;