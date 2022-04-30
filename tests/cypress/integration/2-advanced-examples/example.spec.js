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
describe("login", () => {
    //refresh database
    beforeEach(() => {
        cy.refreshDatabase();
    });

    it("can validation pass", () => {
        cy.create("App\\Models\\User", 1, {
            name: "Hlaing Min Than",
            email: "hmt@gmail.com",
            password:
                "$2y$10$JP5mOqaU8OvPQL.AyjLVJueNEyEIueee33L0YO7vbcFSMHVrrD6T6",
        }).then((user) => {
            cy.visit("/").contains("a", "Log in").click();
            cy.get("#email").type(user.email);
            cy.get("#password").type("12345678");
            cy.contains("button", "Log in").click();
            cy.contains("Dashboard");
        });
    });

    it("can validation fail when password lower than 3", () => {
        cy.create("App\\Models\\User", 1, {
            name: "Hlaing Min Than",
            email: "hmt@gmail.com",
            password:
                "$2y$10$wZeRpxDgnPxQQdAVdrWAtOLXNnOuo3S7DK24E2EnNp5mGSOmUwVcO",
        }).then((user) => {
            cy.visit("/").contains("a", "Log in").click();
            cy.get("#email").type("hmt12@gmail.com");
            cy.get("#password").type("234");
            cy.contains("button", "Log in").click();
            cy.contains("The password must be at least 8 characters.");
        });
    });

    it("can validation fail when credentials wrong", () => {
        cy.create("App\\Models\\User", 1, {
            name: "Hlaing Min Than",
            email: "hmt@gmail.com",
            password:
                "$2y$10$wZeRpxDgnPxQQdAVdrWAtOLXNnOuo3S7DK24E2EnNp5mGSOmUwVcO",
        }).then((user) => {
            cy.visit("/").contains("a", "Log in").click();
            cy.get("#email").type("hmt32@gmail.com");
            cy.get("#password").type("adsasdfasdf");
            cy.contains("button", "Log in").click();
            cy.contains("These credentials do not match our records.");
        });
    });
});
