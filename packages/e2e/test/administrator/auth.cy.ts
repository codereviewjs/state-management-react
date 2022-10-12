describe("administrator - auth", () => {
  it("should successfully login admin", async () => {
    cy.visit("http://localhost:5173");
    const emailInput = cy.findByLabelText(/email/i);
    const passwordInput = cy.findByLabelText(/password/i);
    const submitButton = cy.findByRole("button", { name: /submit/i });

    emailInput.type("admin@gmail.com");
    passwordInput.type("password");

    submitButton.click();
    cy.findByText(/admin/i).should("exist");
  });

  it("should not login fake user", async () => {
    cy.visit("http://localhost:5173");
    const emailInput = cy.findByLabelText(/email/i);
    const passwordInput = cy.findByLabelText(/password/i);
    const submitButton = cy.findByRole("button", { name: /submit/i });

    emailInput.type("admin123@gmail.com");
    passwordInput.type("password123");

    submitButton.click();
    cy.findByText(/admin/i).should("not", "exist");
  });
});
