/// <reference types="cypress" />
context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8100/signin");
  });
});
it("test signin", () => {
  //https://on.cypres.io/go

  cy.location().should((Home) => {
    expect(Home.hash).to.be.empty;
    expect(Home.origin).to.eq("http://localhost:8100");
    expect(Home.pathname).to.eq("/signin");
  });
  cy.get("ion-input").eq(0).type("maxkennedy@schoool.edu");
  cy.get("ion-input").eq(1).type("1234");
  cy.contains("Log In").click();
  cy.url().should("include", "/interestQuiz");
  cy.contains("let's go!").click();
  cy.url().should("eq", "http://localhost:8100/interestQuiz");
});