//for reference
//https://docs.cypress.io/api/commands/as#Intercept

it("should show all posts after loading", () => {
    // make a fake request to backend
    cy.intercept("/posts", {
        fixture: "posts.json",
        delayMs: 5000,
    }).as("getPosts");
    //go to blogs page
    cy.visit("/blogs");
    //check the loading show
    cy.get(".loading").should("be.visible");
    //check the loading hidden
    cy.wait("@getPosts").get(".loading").should("be.hidden");
    //check the posts test contains
    cy.get(".posts").should("contain", "Fake first post");
});
