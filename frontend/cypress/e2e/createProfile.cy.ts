describe("Create Profile Form", () => {
    beforeEach(() => {
        cy.visit("localhost:3000/createprofile");
    });
    it("Allow users to create profile with unused username", () => {
        cy.getByLabel("name-input").type("Ola");
        cy.getByLabel("surname-input").type("Nordmann");
        cy.getByLabel("username-input").type("olanordmann");
        cy.getByLabel("password-input").type("kari");
        cy.getByLabel("verify-password-input").type("kari");
        cy.getByLabel("submit-button").click();
        cy.url().should("eq", "http://localhost:3000/");
        cy.get(".SnackbarContent-root")
            .should("exist")
            .contains("Successfully created user!");
    });
    it("Do NOT allow user to create profile with taken username", () => {
        cy.getByLabel("name-input").type("Ola");
        cy.getByLabel("surname-input").type("Nordmann");
        cy.getByLabel("username-input").type("mdherman");
        cy.getByLabel("password-input").type("kari");
        cy.getByLabel("verify-password-input").type("kari");
        cy.getByLabel("submit-button").click();
        cy.get(".SnackbarContent-root")
            .should("exist")
            .contains("That username already exists!");
    });
    it("User must include all fields", () => {
        cy.getByLabel("name-input").type("Ola");
        cy.getByLabel("submit-button").click();
        cy.get(".SnackbarContent-root").should("not.exist");
        cy.getByLabel("surname-input").type("Nordmann");
        cy.getByLabel("submit-button").click();
        cy.get(".SnackbarContent-root").should("not.exist");
        cy.getByLabel("username-input").type("olanordmann2");
        cy.getByLabel("submit-button").click();
        cy.get(".SnackbarContent-root").should("not.exist");
        cy.getByLabel("password-input").type("kari");
        cy.getByLabel("submit-button").click();
        cy.get(".SnackbarContent-root").should("not.exist");
        cy.getByLabel("verify-password-input").type("kari");
        cy.getByLabel("submit-button").click();
        cy.url().should("eq", "http://localhost:3000/");
        cy.get(".SnackbarContent-root")
            .should("exist")
            .contains("Successfully created user!");
    });
    it("Passwords must match", () => {
        cy.getByLabel("name-input").type("Ola");
        cy.getByLabel("surname-input").type("Nordmann");
        cy.getByLabel("username-input").type("olanordmann3");
        cy.getByLabel("password-input").type("kari");
        cy.getByLabel("verify-password-input").type("Kari");
        cy.get(".SnackbarContent-root").should("not.exist");
        cy.getByLabel("verify-password-input").clear().type("kari");
        cy.getByLabel("submit-button").click();
        cy.url().should("eq", "http://localhost:3000/");
        cy.get(".SnackbarContent-root")
            .should("exist")
            .contains("Successfully created user!");
    });
});
