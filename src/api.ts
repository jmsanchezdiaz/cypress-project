import { Quote, QuoteAPIResponse } from './type';

function quoteAdapter(data: QuoteAPIResponse) {
  const { id, author, body } = data.quote;

  return { id, author, body };
}

export const api = {
  get: async (): Promise<Quote> => {
    try {
      const request = await fetch('https://favqs.com/api/qotd');
      const data = await request.json();
      return quoteAdapter(data);
    } catch (err) {
      throw new Error('Ha ocurrido un error pana.');
    }
  }
};
