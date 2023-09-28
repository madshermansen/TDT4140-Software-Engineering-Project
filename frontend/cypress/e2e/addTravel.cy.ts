describe("Add Travel", () => {
    beforeEach(() => {
        cy.visit("localhost:3000");
        cy.getByLabel("auth-button").click();
        cy.getByLabel("authmenu-login").click();
        cy.getByLabel("login-username").type("mdherman");
        cy.getByLabel("login-password").type("urmom");
        cy.getByLabel("login-submit").click();
    });

    afterEach(() => {
        cy.getByLabel("auth-button").click();
        cy.getByLabel("authmenu-logout").click();
        cy.getByLabel("addtravel-button").should("not.exist");
        cy.getByLabel("authmenu-login").should("not.exist");
    });

    it("Check Add travel button exists", () => {
        cy.getByLabel("addtravel-button").contains("Add Travel");
    });

    it("Add valid travel", () => {
        cy.getByLabel("addtravel-button").click();
        cy.getByLabel("addtravel-modal").should("exist");
        cy.getByLabel("addtravel-heading").contains("Add Travel Route");
        cy.getByLabel("travelroute-title").type("Cypress has been to Neptune");
        cy.getByLabel("travelroute-description").type("Lovely!");
        cy.get('[for=":rc:"]').click();
        cy.get('[for=":rn:"]').click();
        cy.get('[for=":r12:"]').click();
        cy.getByLabel("travelroute-tags").type("neptune");
        cy.getByLabel("addtravel-submit").click();
        cy.getByLabel("addtravel-modal").should("not.exist");
        cy.get(".SnackbarContent-root")
            .should("exist")
            .contains("Successfully added your travel!");
        cy.getByLabel("addtravel-button").click();
        cy.getByLabel("addtravel-modal").should("exist");
        cy.getByLabel("travelroute-title").should("not.have.value");
        cy.getByLabel("travelroute-description").should("not.have.value");
        cy.getByLabel("travelroute-tags").should("not.have.value");
        cy.getByLabel("addtravel-modal").type("{esc}");
    });

    it("Cannot add travel with missing fields", () => {
        cy.getByLabel("addtravel-button").click();
        cy.getByLabel("addtravel-modal").should("exist");
        cy.getByLabel("travelroute-description").type("Lovely!");
        cy.getByLabel("travelroute-tags").type("neptune");
        cy.getByLabel("addtravel-submit").click();
        cy.getByLabel("addtravel-modal").should("exist");
        cy.get(".SnackbarContent-root")
            .should("exist")
            .contains(
                "Make sure your adventure contains a title and description!"
            );
        cy.getByLabel("addtravel-modal").type("{esc}");
    });
});
