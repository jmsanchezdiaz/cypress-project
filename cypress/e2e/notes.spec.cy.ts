describe('Notes tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should be the input focused and empty', () => {
    cy.get('[placeholder="Ingrese su nota..."')
      .should('be.focus')
      .should('have.value', '');
  });

  it('can create a new note', () => {
    //Escribo la nota
    cy.get('[placeholder="Ingrese su nota..."').type('testing note');

    //Agrego la nota
    cy.get('input+button').click();

    //Compruebo que se haya agregado la nota, y las otras notas sigan existiendo.
    cy.get('[data-cy="notes-list"] li')
      .should('have.length', 3)
      .within(() => {
        cy.contains('testing note');
      });
  });

  it("can't create a new note with empty input", () => {
    //Agrego la nota
    cy.get('input+button').click();

    //Compruebo que no se haya agregado la nota, y las otras notas sigan existiendo.
    cy.get('[data-cy="notes-list"] li').should('have.length', 2);
  });

  it('can delete an existing note', () => {
    cy.get('[data-cy="notes-list"] li').should('have.length', 2);

    cy.get('[data-cy="notes-list"] li button').first().click();

    cy.get('[data-cy="notes-list"] li').should('have.length', 1);
  });

  it('can toggle an active status on an existing note', () => {
    cy.get('[placeholder="Ingrese su nota..."]').type('testing note');
    cy.get('input+button').click();

    cy.get('[data-cy="notes-list"] li')
      .last()
      .should('have.css', 'text-decoration-line', 'none')
      .should('have.css', 'color', 'rgb(0, 0, 0)');

    cy.get('[data-cy="notes-list"] li').last().dblclick();

    cy.get('[data-cy="notes-list"] li')
      .last()
      .should('have.css', 'text-decoration-line', 'line-through')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  });
});
