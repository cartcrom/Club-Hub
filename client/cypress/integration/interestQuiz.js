describe('InterestQuiz Test', () => {
  it('Tests loging in, taking the interest quiz, and that the explore pages represents your interests', () => {
    cy.visit('http://localhost:8100/login');
    cy.contains('I have an account').click();
    cy.get('ion-input').eq(0).type('maxkennedy@school.edu');
    cy.get('ion-input').eq(1).type('1234');
    cy.contains('Log In').click();
    cy.url().should('include', '/interestQuiz');
    cy.contains("let's go!").click();
    cy.url().should("eq", "http://localhost:8100/login#/interestQuiz");
    //fill out major information
    cy.get("input").eq(0).type("Engineering\n");
    cy.get("input").eq(1).type("Software Engineering\n");
    cy.contains("next").click();
    //fill out interests
    cy.get("ion-checkbox").eq(1).click();
    cy.get("ion-checkbox").eq(4).click();
    cy.get("ion-checkbox").eq(5).click();
    cy.contains("next").click();
    cy.get("ion-checkbox").eq(0).click();
    cy.get("ion-checkbox").eq(2).click();
    cy.get("ion-checkbox").eq(4).click();
    cy.get("ion-checkbox").eq(5).click();
    cy.contains("next").click();
    cy.get("ion-checkbox").eq(0).click();
    cy.get("ion-checkbox").eq(1).click();
    cy.get("ion-checkbox").eq(2).click();
    cy.get("ion-checkbox").eq(3).click();
    cy.contains("next").click();
    //check explore tags represent that
    cy.contains('EXPLORE').click();
  });

  it('Tests loging in, skips interest quiz', () => {
    cy.visit('http://localhost:8100/login');
    cy.contains('I have an account').click();
    cy.get('ion-input').eq(0).type('maxkennedy@school.edu');
    cy.get('ion-input').eq(1).type('1234');
    cy.contains('Log In').click();
    cy.url().should('include', '/interestQuiz');
    cy.contains("skip").click();
    cy.url().should("eq", "http://localhost:8100/login#/feed");
    cy.contains('ME').click();
  });
})