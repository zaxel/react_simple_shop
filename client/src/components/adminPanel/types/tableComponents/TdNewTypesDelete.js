import React from 'react';

const TdNewTypesDelete = ({data }) => {

    const onButtonClickHandler = () => {
        if(window.confirm('delete this line?')){
            data.dropNewLine(data.id);
        }
    }

    return (
        <td>
            <button onClick={onButtonClickHandler}>X</button>
        </td>
    );
};

export default TdNewTypesDelete;