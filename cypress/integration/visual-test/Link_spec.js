describe('Link visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Link');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Link',
    });
  });
});
