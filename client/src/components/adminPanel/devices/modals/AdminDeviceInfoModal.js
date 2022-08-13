import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import ThDescriptionTooltip from './components/ThDescriptionTooltip';
import TrDescriptions from './components/TrDescriptions';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchInfo, createDeviceInfos } from '../../../../utils/administration/adminDeviceInfo';
import { setDataToStore } from '../../../../utils/administration/common';
import TrDescNewLine from './components/TrDescNewLine';


const AdminDeviceInfoModal = observer(({ show, onHide }) => {
    
    const { adminDevicesInfo, cart, user } = useContext(Context);
    let thRefs = useRef([]);
    const deviceName = adminDevicesInfo.deviceName;
    const deviceId = adminDevicesInfo.deviceId;
    useEffect(() => {
        
        (async()=>{
            if (deviceId) {
                const fetchedInfo = await fetchInfo(adminDevicesInfo, deviceId, null, null, cart, user);
                if(fetchedInfo.loggedOut)return;
                await setDataToStore(adminDevicesInfo, 'setInfo', fetchedInfo);
            }
        })()
        
    }, [adminDevicesInfo.updateDataTrigger])

    const ths = [
        { title: 'title', sortBy: 'title' },
        { title: 'description', sortBy: null },
        { title: 'destroy', sortBy: null },
    ];

    const tds = [
        { id: 18, title: 'tester', description: 'some descrioption' },
        { id: 2, title: 'router', description: 'other descrioption' },
        { id: 22, title: 'fixer', description: 'some descrioption' },
        { id: 1, title: 'box', description: 'some descrioption' },
        { id: 16, title: 'jam', description: 'some descrioption' },
        { id: 4, title: 'butter', description: 'some descrioption' },
        { id: 5, title: 'table', description: 'some descrioption' },
    ]

    const onHidePressed = () => {
        onHide();
        adminDevicesInfo.refreshNewInfo();
    }

    const addNewLine = () => {
        const id = uuidv4();
        adminDevicesInfo.addNewInfoLine(id);
    }
    const dropNewLine = (id) => {
        adminDevicesInfo.dropNewInfoLine(id);
    }
    const triggerModalUpdate = () => {
        adminDevicesInfo.setUpdateDataTrigger(!adminDevicesInfo.updateDataTrigger);
    }
    const onSaveClickHandler = async() => {
        const newLinesNoEmptyFields = adminDevicesInfo.newInfo
            .filter(el=>el.description !== '' && el.title !== '')
            .map(el => {
                return {deviceId: deviceId, description: el.description, title:el.title};
            })

        if(!newLinesNoEmptyFields.length){
            alert('no data to be updated');
            adminDevicesInfo.refreshNewInfo();
            return;
        }
        const { loggedOut } = await createDeviceInfos(adminDevicesInfo, newLinesNoEmptyFields, cart, user); 
        if(loggedOut)return;
        await adminDevicesInfo.refreshNewInfo();
        triggerModalUpdate();
    }

    
    const thsWithTooltip = ths.map((el, i) => {
        const myKey = uuidv4();
        let ref = (el) => (thRefs.current[i] = el);
        let toolTipInfo = { i, myRefs: thRefs, text: 'sort' };
        return <ThDescriptionTooltip toolTipInfo={toolTipInfo} innerRef={ref} key={myKey} data={el} />
    })

    // const trs = tds.map((el, i) => {
    const trs = adminDevicesInfo.info?.rows?.map((el, i) => {
        return <TrDescriptions key={el.id} data={el} />
    })
    const trsNewLine = adminDevicesInfo.newInfo?.map((el, i) => {
        return <TrDescNewLine key={el.id} data={{ id: el.id , dropNewLine}} /> 
    })


    return (
        <Modal className='modal-table' centered show={show} onHide={onHidePressed}>
            <Modal.Header closeButton>
                <Modal.Title>Change "{deviceName}" descriptions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {adminDevicesInfo.loading
                    ? <div className="spinner spinner__device-info">
                        <Spinner animation="border" />
                    </div>
                    : <Form.Group className="mb-3">
                        <table className='stripped-table'>
                            <thead>
                                <tr>
                                    {thsWithTooltip}
                                </tr>
                            </thead>
                            <tbody>
                                {trs}
                                {trsNewLine}
                            </tbody>
                        </table>
                    </Form.Group>}



            </Modal.Body>
            <Modal.Footer className="admin-device__footer-modal">
                <div>
                    <Button className="admin-device__add-button" variant="primary" onClick={addNewLine}>
                        Add new info line
                    </Button>
                    {!!adminDevicesInfo.newInfo.length && <Button variant="primary" onClick={onSaveClickHandler}>
                        Save new info lines
                    </Button>}
                </div>

                <Button variant="secondary" onClick={onHidePressed}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    );
});

export default AdminDeviceInfoModal;