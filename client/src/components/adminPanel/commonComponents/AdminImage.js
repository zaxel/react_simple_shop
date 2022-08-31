import React, { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { correctImgTypeCheck } from '../../../utils/formsServing/imgServing';

const AdminImage = ({ inputTitle, inputData, cb, alt }) => {
    const fileRef = useRef(null);
    const inputLast = useRef(null);
    const confirmRef = useRef(null);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
    const [imgChooseOpen, setImgChooseOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setInput(inputData);
        inputLast.current = inputData;
    }, [inputData])

    const isStateChanged = () => {
        return inputLast.current !== input;
    }

    const onImgClickHandler = () => {
        setEdit(true);
    }
    const onConfirmBlurHandler = (e) => {
        if (!(e.relatedTarget === fileRef.current)) {
            setEdit(false)
        }
    }

    const onConfirmClickHandler = async () => {
        setEdit(false);
        if (isStateChanged()) {
            try {
                if (!correctImgTypeCheck(input)) return;
                setLoading(true);
                await cb(input);
                inputLast.current = input;
            } catch (e) {
                setInput(inputLast.current);
                alert('oops, something went wrong!');
                console.log(e?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
    }
    const onInputChange = (e) => {
        setInput(() => e.target.files[0])
    }
    const onInputBlur = (e) => {
        if (!imgChooseOpen && e.relatedTarget !== confirmRef.current)
            setEdit(false);
    }
    const onInputClick = (e) => {
        setImgChooseOpen(true)
    }
    const onInputFocus = (e) => {
        setImgChooseOpen(false)
    }
    return (
        <div className='admin__image-edit image-admin'>
            <div className='admin__image-container'>
                {loading ?
                    <div className="td-spinner">
                        <Spinner animation="border" />
                    </div> :
                    <>
                        {inputTitle && <h2>edit {inputTitle}: </h2>}
                        {!edit
                            ? <div onClick={onImgClickHandler} className='image-admin__img' >
                                <img alt={alt} src={process.env.REACT_APP_API_URL + inputData} />
                            </div>
                            : <div className='image-admin__edit-cont'>
                                <input autoFocus onBlur={onInputBlur} onFocus={onInputFocus} className='' type='file' accept="image/*" ref={fileRef} onChange={onInputChange} onClick={onInputClick} />
                                <button ref={confirmRef} onClick={onConfirmClickHandler} onBlur={onConfirmBlurHandler}>update</button>
                            </div>}
                    </> }

            </div>
        </div>
    );
};


export default AdminImage;