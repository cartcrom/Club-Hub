describe("Invalid Explore Test', () => {
  it('Tests finding a nonexistant club', () => {
    cy.visit('http://localhost:8100/login')
    cy.contains('I have an account').click()
    cy.get('ion-input').eq(0).type('maxkennedy@school.edu')
    cy.get('ion-input').eq(1).type('1234')
    cy.contains('Log In').click()
    cy.contains('EXPLORE').click()
    cy.get('ion-searchbar').type('Nonexistant')
    cy.contains('Nonexistant').should('not.exist')
  })
})