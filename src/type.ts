export interface Quote {
  id: number;
  body: string;
  author: string;
}

export interface QuoteAPIResponse {
  quote: {
    id: number;
    body: string;
    author: string;
  };
}
