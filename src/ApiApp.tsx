import { useEffect, useState } from 'react';
import { api } from './api';
import { Quote } from './type';

const ApiApp = () => {
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    generateQuote();
  }, []);

  const generateQuote = () => {
    api.get().then((response) => setQuote(response));
  };

  return (
    <div>
      <h2>Random Quote Generator</h2>
      <blockquote>
        {quote?.body}
        <cite>{quote?.author}</cite>
      </blockquote>
      <button onClick={generateQuote}>New quote</button>
    </div>
  );
};

export default ApiApp;
