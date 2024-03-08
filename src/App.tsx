import { useEffect, useState } from 'react';
import './App.scss';
import { QuoteResponse } from './interfaces/interfaces';

const App = () => {
  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    onGenerateQuote();
  }, []);

  const onGenerateQuote = async () => {
    const API_URL = `https://api.quotable.io/random`;

    const response = await fetch(API_URL);
    const generatedQuote: QuoteResponse = await response.json();

    setQuote(generatedQuote.content);
  };

  return (
    <>
      {quote}
      <button onClick={onGenerateQuote}>Generate Quote</button>
    </>
  );
};

export default App;
