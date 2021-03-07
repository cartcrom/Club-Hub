describe("Successful Login Test", () => {
  it("Tests that login works with the correct credentials", () => {
    cy.visit("http://localhost:8100/login");
    cy.contains("I have an account").click();
    cy.get("ion-input").eq(0).type("maxkennedy@school.edu");
    cy.get("ion-input").eq(1).type("1234");
    cy.contains("Log In").click();
    cy.url().should("include", "/interestQuiz");
  });
});

describe("Failed Login Test", () => {
  it("Tests that login provides feedback with incorrect credentials", () => {
    cy.visit("http://localhost:8100/login");
    cy.contains("I have an account").click();
    cy.get("ion-input").eq(0).type("maxkennedy@school.edu");
    cy.get("ion-input").eq(1).type("123");
    cy.contains("Log In").click();
    cy.url().should("include", "/signin");
    cy.contains("Invalid Login").should("exist");
  });
});

describe("Failed Sign Up Test", () => {
  it("Tests that a user cannot create a new account with an existing email", () => {
    cy.visit("http://localhost:8100/login");
    cy.contains("I'm a new user").click();
    cy.get("ion-input").eq(0).type("Maxwell");
    cy.get("ion-input").eq(1).type("Kennedy");
    cy.get("ion-input").eq(2).type("maxkennedy@school.edu");
    cy.get("ion-input").eq(3).type("123456");
    cy.contains("Log In").click();
    cy.url().should("include", "/signup");
    cy.contains("Email Already in Use").should("exist");
  });
});
