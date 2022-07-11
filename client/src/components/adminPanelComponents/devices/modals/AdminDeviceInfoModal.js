import React, { useContext, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../../../..';
import { v4 as uuidv4 } from 'uuid';
import ThDescriptionTooltip from './components/ThDescriptionTooltip';
import TrDescriptions from './components/TrDescriptions';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchInfo } from '../../../../utils/adminDeviceInfo';

const AdminDeviceInfoModal = observer(({ show, onHide }) => {
    const { toolTip, adminDevicesInfo } = useContext(Context);
    let thRefs = useRef([]);

    useEffect(()=>{
        const deviceId = adminDevicesInfo.info?.rows?.[0].deviceId;

        if(deviceId){
            fetchInfo(adminDevicesInfo, deviceId)
        }  
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
        { id: 4, title: 'butter', description: 'some descrioption'},
        { id: 5, title: 'table', description: 'some descrioption' },
    ]



    const onRowClickHandler = () => {
        toolTip.setIsAvailable(false);
        toolTip.setIsToolTipShown(false);
        alert('order detail');
        toolTip.setIsAvailable(true);
    }

    const onThClickHandler = () => {
        toolTip.setIsAvailable(false);
        toolTip.setIsToolTipShown(false);
        alert('sort');
        toolTip.setIsAvailable(true);
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

    return (
        <Modal className='modal-table' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Change Device Descriptions</Modal.Title>
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
                        </tbody>
                    </table>
                </Form.Group>}
            
                

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    );
});

export default AdminDeviceInfoModal;