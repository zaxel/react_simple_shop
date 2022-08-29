import React from 'react';
import { observer } from 'mobx-react-lite';


const AppAdmin = observer(() => {
    

    // if (types.loading) {
    //     return (
    //         <div className="spinner">
    //             <Spinner animation="border" />
    //         </div>
    //     )
    // }
    return (
        <div className='admin-pages__app admin-pages__page'>
            app pages
        </div>
    );
});

export default AppAdmin;