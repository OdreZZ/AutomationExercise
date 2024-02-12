describe('Google', () => {
  it('should open Google', () => {
    // Visit Google
    cy.visit('https://www.google.com');

    // Assert that the title contains "Google"
    cy.title().should('include', 'Google');
  });
});