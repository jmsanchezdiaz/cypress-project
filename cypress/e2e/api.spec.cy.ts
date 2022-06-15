describe('api qoute tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {});

  it('at beginning should generate a random quote', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://favqs.com/api/qotd'
      },
      {
        quote: {
          id: 43044,
          body: 'ANASHEEE',
          author: 'martin p disalvo'
        }
      }
    ).as('generateQuote');

    cy.get('blockquote').contains('ANASHEEE');
    cy.get('blockquote cite').contains('martin p disalvo');
  });

  it('when click new quote button it generate a random quote', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://favqs.com/api/qotd'
      },
      {
        quote: {
          id: 43444,
          body: 'me detono a mi teacher',
          author: 'momo'
        }
      }
    ).as('generateQuote');

    cy.get('button').click();

    cy.get('blockquote').contains('me detono a mi teacher');
    cy.get('blockquote cite').contains('momo');
  });
});
