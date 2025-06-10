describe('My React App', () => {
  it('should load the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('React');
  });
});
