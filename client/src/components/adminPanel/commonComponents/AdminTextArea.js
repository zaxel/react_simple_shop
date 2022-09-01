import React, { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const AdminTextArea = ({ areaTitle, areaText, cb }) => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const inputLast = useRef(null);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInput(areaText);
        inputLast.current = areaText;
    }, [areaText])

    const isStateChanged = () => {
        return inputLast.current !== input;
    }

    const onDivClickHandler = () => {
        setEdit(true);
    }
    const onInputBlur = (e) => {
        if (!(e.relatedTarget === buttonRef.current)) {
            setEdit(false)
        }
    }
    const onButtonBlurHandler = () => {
        setEdit(false);
    }
    const onButtonClickHandler = async () => {
        setEdit(false);
        if (isStateChanged()) {
            try {
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
        setInput(() => e.target.value)
    }

    return (
        <div className='admin__area-edit'>
            <div className='admin__area-container'>
                {loading ?
                    <div className="td-spinner">
                        <Spinner animation="border" />
                    </div> :
                    <>
                        <h2>{areaTitle}:</h2>
                            {!edit
                                ? <div onClick={onDivClickHandler}>{input}</div>
                                : <div className='display-flex'>
                                    <textarea ref={inputRef} autoFocus type='text' value={input} onChange={onInputChange} onBlur={onInputBlur} />
                                    <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                                </div>}
                    </>}
            </div>
        </div>
    );
};


export default AdminTextArea;