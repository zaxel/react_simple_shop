import { observer } from 'mobx-react-lite';
import React, { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const AdminTextInput = ({ title, text, cb, store}) => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const inputLast = useRef(null);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setInput(text);
        inputLast.current = text;
    }, [text])


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
    const onButtonClickHandler = async() => {
        setEdit(false);
        if (isStateChanged()) {
            try{
                inputLast.current = input;
                setLoading(true);
                await cb(store, null, 'title', input);
            }catch(e){
                console.log(e);
            }finally{
                setLoading(false);
            }
        }

        // const cb = inputCb.bind(this, id, dbFieldName, input, cart, user);
        // onInputButtonClickHandler(toolTip, setEdit, setLoading, cb, store, id, dbFieldName, input);

    }
    const onInputChange = (e) => {
        setInput(()=> e.target.value)
    }

    // if (loading) {
    //     return (
    //         <td className="td-spinner">
    //             <Spinner animation="border" />
    //         </td>
    //     )
    // }
    return (
        <div className='admin__input-edit'>
            <div className='admin__input-container'>
            {loading ? 
                <div className="td-spinner">
                    <Spinner animation="border" />
                </div> :
                <><h2>{title}: </h2>
                <div>
                    {!edit
                        ? <div onClick={onDivClickHandler}>{input}</div>
                        : <div className='display-flex'>
                            <input ref={inputRef} autoFocus type='text' value={input} onChange={onInputChange} onBlur={onInputBlur} />
                            <button ref={buttonRef} onClick={onButtonClickHandler} onBlur={onButtonBlurHandler}>V</button>
                        </div>}
                </div></>}
                
            </div>


        </div>
    );
};


export default AdminTextInput;