describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get("#password").type("pfnassar1")
    cy.get("#email").type("pfnassar@calpoly.edu")
    cy.contains("Log in").click()
    cy.wait(3000)
    cy.contains("3").click()
  })
})