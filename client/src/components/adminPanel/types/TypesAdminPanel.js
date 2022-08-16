import React, { useState, useRef, useContext, useEffect } from 'react';
import ThAdminTypesTooltip from './tableComponents/ThAdminTypesTooltip';
import TrTypes from './tableComponents/TrTypes';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../..';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchPage } from '../../../utils/administration/adminTypes';
import TrTypesNewLine from './tableComponents/TrTypesNewLine';
import { addNewTypes as addNewTypesReq } from '../../../utils/administration/adminTypes';
import { TypesThs as ths } from '../../../utils/consts/thTitles';

const TypesAdminPanel = observer(() => {
    let thRefs = useRef([]);
    const { toolTip, types, cart, user } = useContext(Context);

    useEffect(() => {
        (async () => {
            try {
                await fetchPage(types);
                toolTip.setIsAvailable(true);
            } catch (e) {
                console.log(e)
            }
        })()

    }, [])

    useEffect(() => {
        fetchPage(types);
    }, [types.updateDataTrigger])

    const addNewTypes = () => {
        const id = uuidv4();
        types.addNewTypesLine(id);
    }
    const dropNewLine = (id) => {
        types.dropNewTypesLine(id);
    }
    const triggerTypesUpdate = () => {
        types.setUpdateDataTrigger(!types.updateDataTrigger);
    }
    const onSaveClickHandler = async() => {
        const newLinesNoEmptyFields = types.newTypes
            .filter(el=>el.name !== '')
            .map(el => {
                return {name: el.name};
            })

        if(!newLinesNoEmptyFields.length){
            alert('no data to be updated');
            types.refreshNewInfo();
            return;
        }
        const { loggedOut } = await addNewTypesReq(newLinesNoEmptyFields, cart, user); 
        if(loggedOut)return;
        types.refreshTypes(); 
        triggerTypesUpdate();
    }

    const thsWithTooltip = ths.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
        return <ThAdminTypesTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

    const trs = types.types.map((el, i) => {
        return <TrTypes key={el.id} data={el} />
    })
    const trsNewLine = types.newTypes?.map((el, i) => {
        return <TrTypesNewLine key={el.id} data={{ el, dropNewLine}} /> 
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
                    <tfoot>
                        {trsNewLine}
                    </tfoot>
                </table>
                <div className='addTypes-buttons__container'>
                    <button className="admin-device__add-button" onClick={addNewTypes}>
                        Add new type line
                    </button>
                    {!!types.newTypes.length && <button className='alert-button-self' onClick={onSaveClickHandler}>
                        Save new type lines
                    </button>}
                </div>
            </div>
        </div>
    );
});

export default TypesAdminPanel;