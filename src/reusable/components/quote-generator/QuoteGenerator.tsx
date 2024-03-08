import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Quote, QuoteResponse } from '../../../interfaces/interfaces';
import classNames from 'classnames';
import styles from './QuoteGenerator.module.scss';
import Loader from '../loader/Loader';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState<Quote>({
    author: '',
    text: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    onGenerateQuote();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [quote]);

  const onGenerateQuote = async () => {
    setIsLoading(true);
    const API_URL = `https://api.quotable.io/random`;

    const response: AxiosResponse<QuoteResponse> = await axios.get(API_URL);
    const fetchedQuote: Quote = {
      text: response.data.content,
      author: response.data.author,
    };

    setQuote(fetchedQuote);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div className={styles['quote']}>
            <div className={styles['quote__text']}>
              <i className="fas fa-quote-left"></i>
              <span
                className={classNames({
                  [styles.long]: quote.text.length > 60,
                })}
              >
                {quote.text}
              </span>
              <i className="fas fa-quote-right"></i>
            </div>
            <div className={styles['quote__author']}>
              <span>{quote.author}</span>
            </div>
          </div>

          <div className={styles['quote__buttons']}>
            <button
              className={classNames(
                styles['button'],
                styles['button--twitter']
              )}
            >
              <i className="fab fa-twitter"></i>
            </button>
            <button
              className={classNames(
                styles['button'],
                styles['button--new-quote']
              )}
              onClick={onGenerateQuote}
            >
              New Quote
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default QuoteGenerator;
