describe("administrator - report", () => {
  let createdReportId = "";

  it("should successfully create a report", async () => {
    cy.visit("http://localhost:5173");

    cy.intercept({
      method: "POST",
      url: "http://localhost:8000/v1/auth/login",
    }).as("login");

    cy.findByLabelText(/email/i).type("haidenRoberson@gmail.com");
    cy.findByLabelText(/password/i).type("Password123!");
    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(/Haiden/i).should("exist");

    cy.findByRole("button", {
      name: /create report/i,
    }).click();
    cy.findByText(/report creation/i).should("exist");

    cy.intercept({
      method: "POST",
      url: "http://localhost:8000/v1/report",
    }).as("createReport");

    cy.findByLabelText(/title/i).type("new report for testing");
    cy.findByLabelText(/description/i).type("description");
    cy.findByTestId("btn-create-report").should("not.be.disabled");
    cy.findByTestId("btn-create-report").click();
    cy.findByText("new report for testing").should("exist");
    cy.wait("@createReport").then((interception) => {
      cy.wait("@login").then((loginIntercept) => {
        cy.log(loginIntercept.response?.body?.token);
        cy.request({
          method: "DELETE",
          url: `http://localhost:8000/v1/report/${interception.response?.body?.report?._id}`,
          headers: {
            authorization: `Bearer ${loginIntercept.response?.body?.token}`,
          },
        });
      });
    });
  });

  it.skip("should successfully edit a report", async () => {
    cy.visit("http://localhost:5173");
    cy.findByLabelText(/email/i).type("haidenRoberson@gmail.com");
    cy.findByLabelText(/password/i).type("Password123!");
    cy.findByRole("button", { name: /submit/i }).click();

    cy.visit(`http://localhost:5173/report/${createdReportId}/edit`);
  });
});
