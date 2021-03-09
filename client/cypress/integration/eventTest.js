<<<<<<< HEAD
describe('Luke\'s levent test', () => {
    it('Tests making an event', () => {
      cy.visit('http://localhost:8100/login')
      cy.contains('I have an account').click()
      cy.get('ion-input').eq(0).type('maxkennedy@school.edu')
      cy.get('ion-input').eq(1).type('1234')
      cy.contains('Log In').click()
      cy.contains('CLUBS').click()
      cy.contains('Ice Cream Club').click()
      cy.contains('Event').click()
      cy.get('ion-input').eq(0).type('Cool Event!')
      cy.get('ion-input').eq(1).type('Its cool. I promise')
      cy.get('ion-input').eq(2).type('If you know then you know')
      cy.get('ion-input').eq(3).type('https://static.wikia.nocookie.net/unanything/images/7/79/Kung_Fu_Cat.jpg/revision/latest?cb=20140621163548')
      cy.get('ion-datetime').eq(0).click()
      cy.contains('Done').click()
      cy.contains("Cancel").click()
      cy.contains("Cool Event!").should('exist')
    })
  })
=======
describe("Adding a new event test", () => {
  it("Tests logging in and adding an event", () => {
    cy.visit("http://localhost:8100/login");
    cy.contains("I have an account").click();
    cy.get("ion-input").eq(0).type("maxkennedy@school.edu");
    cy.get("ion-input").eq(1).type("1234");
    cy.contains("Log In").click();
    cy.contains("CLUBS").click();
    cy.contains("Ice Cream Club").click();
    cy.contains("Event").click();
    cy.get("ion-input").eq(0).type("Cool Event!");
    cy.get("ion-input").eq(1).type("Its cool. I promise");
    cy.get("ion-input").eq(2).type("If you know then you know");
    cy.get("ion-input").eq(3).type("https://static.wikia.nocookie.net/unanything/images/7/79/Kung_Fu_Cat.jpg/revision/latest?cb=20140621163548");
    cy.get("ion-datetime").eq(0).click();
    cy.contains("Done").click();
    cy.contains("Add Event").click();
    cy.contains("Cool Event!").should("exist");
  });
})
>>>>>>> 3372515cf76f8ee8341f45146cc554c4348adfc5
