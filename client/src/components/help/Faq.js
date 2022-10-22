import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import ErrorPage from '../../pages/ErrorPage';
import { fetchPage, fetchFaq, fetchFaqCategory } from '../../utils/staticPages/helpPage';
import FooterCard from './FooterCard';

const Faq = observer(() => {
  let { faq } = useParams();
  const { helpPage } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [wrongPage, setWrongPage] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!helpPage.categories.length) {
          fetchFaqCategory(helpPage);
        }
        if (!helpPage.contactTitle ?? !helpPage.contactHero) {
          fetchPage(helpPage);
        }
        if (!faq) {
          setWrongPage(true);
          return;
        }
        await fetchFaq(helpPage, null, faq);
      } catch (err) {
        setWrongPage(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    })()
  }, [])


  let relatedFaqs = null;
  if (helpPage.faqRelated.length) {
    relatedFaqs = helpPage.faqRelated.map(faq => <FooterCard key={faq.id} {...faq} />)
  }

  if (loading) {
    return (<div className="spinner">
      <Spinner animation="border" />
    </div>)
  }
  if (wrongPage)
    return <ErrorPage />

  return (
    <div className='help__category help__faq'>
      <div className='help-faq__wrapper'>
        <div className='help-faq__main-cont'>
          <h3>helpPage category</h3>
          <h2>{helpPage.faqQuestion}</h2>
          <div className='help-faq__main-body' dangerouslySetInnerHTML={{ __html: helpPage.faqAnswer }}></div>
        </div>
        <div className='help-faq__related-cont'>
          <div className='popular-cont'>
            <h3>related faq's</h3>
            <ul className='popular-cont__cards'>
              {relatedFaqs}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Faq;