import { observer } from 'mobx-react-lite';
import React from 'react';
import Faq from './Faq';
import HelpAside from './subPages/HelpAside';

const FaqContainer = observer(() => {
  
    return (
        <div className='help__main-wrapper'>
          <Faq/>  
          <HelpAside/>  
        </div>
    );
});

export default FaqContainer;