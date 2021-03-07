describe('Luke\'s Explore Test', () => {
    it('Tests finding an existing club', () => {
      cy.visit('http://localhost:8100/login')
      cy.contains('I have an account').click()
      cy.get('ion-input').eq(0).type('maxkennedy@school.edu')
      cy.get('ion-input').eq(1).type('1234')
      cy.contains('Log In').click()
      cy.contains('EXPLORE').click()
      cy.get('ion-searchbar').type('Ice')
      cy.contains('Ice Cream Club').click()
      cy.url().should('include', '/60088732d958ac35d881b6c9')
    })
  })

  describe('Luke\'s Explore Test', () => {
    it('Tests finding an existing club', () => {
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