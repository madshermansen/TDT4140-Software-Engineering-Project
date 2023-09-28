describe("Home page", () => {
    it("The Home page contains the correct elements", () => {
        cy.visit("localhost:3000");
        cy.get("h4").contains("New Travel Routes");
    });
});

describe("NavBar", () => {
    it("The Navigation Bar is showing and contains the correct elements", () => {
        cy.visit("localhost:3000");
        cy.get("h1").contains("Adventure Atlas");
        cy.getByLabel("auth-button").contains("Log in");
    });
});
