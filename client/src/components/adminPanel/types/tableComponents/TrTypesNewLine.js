import TdNewTypesInput from './TdNewTypesInput';
import TdNewTypesDelete from './TdNewTypesDelete';
import { idShortener } from '../../../../utils/dataFormat/idShortener';
const TrTypesNewLine = ({ data }) => {
    
    return (
        <tr >
            <td>{idShortener(data.el.id)}</td>
            <TdNewTypesInput data={{id: data.el.id, dbFieldName: 'name'}}/>
            <td>-- // --</td>
            <td>-- // --</td>
            <TdNewTypesDelete data={{id: data.el.id, dropNewLine: data.dropNewLine}}/>
        </tr>
    );
};

export default TrTypesNewLine;