describe('Vance\'s login test', () => {
  it('Tests loging in', () => {
    cy.visit('http://localhost:8100/login')
    cy.contains('I have an account').click()
    cy.get('ion-input').eq(0).type('maxkennedy@school.edu')
    cy.get('ion-input').eq(1).type('1234')
    cy.contains('Log In').click()
    cy.url().should('include', '/interestQuiz')
    cy.contains("let's go!").click();
    cy.url().should("eq", "http://localhost:8100/login#/interestQuiz");
  })
})