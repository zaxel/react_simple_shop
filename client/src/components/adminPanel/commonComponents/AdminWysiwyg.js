import React, { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminWysiwyg = ({ areaTitle, areaText, cb }) => {
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
    const onInputBlur = (e, source) => {
        if (source === 'silent') return;
        if (!(e.relatedTarget === buttonRef.current)) {
            setEdit(false);
            setInput(inputLast.current);
        }
    }
    
    const onButtonBlurHandler = () => {
        setEdit(false);
        setInput(inputLast.current);
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
    

    return (
        <div className='admin__wysiwyg-edit'>
            <div className='admin__wysiwyg-container'>
                {loading ?
                    <div className="td-spinner">
                        <Spinner animation="border" />
                    </div> :
                    <>
                        <h2>{areaTitle}:</h2>
                        {!edit
                            ? <div dangerouslySetInnerHTML={{ __html: input }} onClick={onDivClickHandler}></div>
                            : <div className='display-flex'>
                                <ReactQuill theme="snow" ref={inputRef} autoFocus value={input} onChange={setInput} onBlur={onInputBlur} />
                                <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                            </div>}
                    </>}
            </div>
        </div>
    );
};


export default AdminWysiwyg;