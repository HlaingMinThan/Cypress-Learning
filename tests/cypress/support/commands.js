/**
 * Fetch the body of an iFrame.
 */
Cypress.Commands.add("getIframe", () => {
    return cy
        .get("iframe")
        .its("0.contentDocument.body", { log: false })
        .should("not.be.empty")
        .then((body) => {
            cy.wrap(body, { log: false });
        });
});

/**
 * Enter the card details for a Stripe elements form.
 *
 * @param  {Object} options
 */
Cypress.Commands.add("enterStripeCard", (options = {}) => {
    options = {
        ...{ approved: true },
        ...options,
    };

    cy.getIframe().within(() => {
        cy.get("[name=cardnumber]")
            .type(options.approved ? "4242424242424242" : "4000000000000002")
            .wait(300);

        cy.get("[name=exp-date]").type("0424").wait(300);
        cy.get("[name=cvc]").type("242").wait(300);
        cy.get("[name=postal]").type("42424");
    });
});

Cypress.Commands.add("writeFixtureByServer", (url, fixturePath) => {
    cy.request(url).as("getServerPosts");
    cy.get("@getServerPosts").then((res) =>
        cy.writeFile(fixturePath, res.body)
    );
});
