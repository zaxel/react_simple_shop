import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import ErrorPage from '../../pages/ErrorPage';
import { fetchPage, fetchFaq, fetchFaqCategory } from '../../utils/staticPages/helpPage';
import FooterCard from './FooterCard';
import BreadCrumbs from './subPages/BreadCrumbs';

const Faq = observer(() => {
  let { faq } = useParams();
  const { helpPage } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [wrongPage, setWrongPage] = useState(false);

  const setCurrentCategory = () => {
    const [category] = helpPage.categories.filter(cat=>cat.id === helpPage.faqCategoryId);
    helpPage.setFaqCategory(category);
  }

  const fetchSetFaqComponent = async () => {
    try {
      setLoading(true);
      if (!helpPage.categories.length) {
        await fetchFaqCategory(helpPage);
      }
      if (!helpPage.contactTitle ?? !helpPage.contactHero) {
        fetchPage(helpPage);
      }
      if (!faq) {
        setWrongPage(true);
        return;
      }
      await fetchFaq(helpPage, null, faq);
      setCurrentCategory();
    } catch (err) {
      setWrongPage(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSetFaqComponent();
  }, [])

  useEffect(() => {
    fetchSetFaqComponent();
  }, [faq])

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
      <BreadCrumbs active={3} category={helpPage.faqCategory} faq={helpPage.faqQuestion}/>
        <div className='help-faq__wrapper'>
          <div className='help-faq__main-cont'>
            <h4>{helpPage.faqCategory.title}</h4>
            <h3>{helpPage.faqQuestion}</h3>
            <div className='help-faq__main-body' dangerouslySetInnerHTML={{ __html: helpPage.faqAnswer }}></div>
          </div>
          <div className='help-faq__related-cont'>
            <div className='popular-cont related-cont'>
              <h3>related faq's</h3>
              <ul className='popular-cont__cards'>
                {relatedFaqs || <li>'No related FAQ's'</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
});

export default Faq;