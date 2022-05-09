describe('SlimBanner dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/SlimBanner-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'SlimBanner-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
