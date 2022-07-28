import TdNewBrandsInput from './TdNewBrandsInput';
import TdNewBrandsDelete from './TdNewBrandsDelete';
import { idShortener } from '../../../../utils/dataFormat/idShortener';
const TrBrandsNewLine = ({ data }) => {
    
    return (
        <tr >
            <td>{idShortener(data.el.id)}</td>
            <TdNewBrandsInput data={{id: data.el.id, dbFieldName: 'name'}}/>
            <td>-- // --</td>
            <td>-- // --</td>
            <TdNewBrandsDelete data={{id: data.el.id, dropNewLine: data.dropNewLine}}/>
        </tr>
    );
};

export default TrBrandsNewLine;