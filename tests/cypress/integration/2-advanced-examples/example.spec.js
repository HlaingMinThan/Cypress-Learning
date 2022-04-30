describe("blogs", () => {
    //refresh database
    beforeEach(() => {
        cy.refreshDatabase();
    });

    //test for blogs page
    it("shows all blogs", () => {
        cy.create("App\\Models\\Post", 1, {
            title: "My First Post",
        });
        cy.visit("/blogs").contains("My First Post");
    });
});
