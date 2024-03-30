import { UsernameErrorsEnum } from "~/enums";

describe("joinroom spec", () => {
  beforeEach(() => {
    cy.request("http://localhost:3500/flushUsers");
  });
  it("displays username errors correctly", () => {
    cy.openHomepage();
    cy.get('[data-testid="joinroom-button"]').click();
    cy.get('[data-testid="username-errors"]').should(
      "contain",
      UsernameErrorsEnum.TooShort
    );
    cy.get('[data-testid="username-input"]').type("asd{Enter}");
    cy.get('[data-testid="username-errors"]').should(
      "contain",
      UsernameErrorsEnum.TooShort
    );
    cy.get('[data-testid="username-input"]').type("f");
    cy.get('[data-testid="username-errors"]').should("be.empty");
  });

  it("navigates to lobby with correct username", () => {
    cy.openHomepage();
    cy.get('[data-testid="username-input"]').type("asdf{Enter}");
    cy.url().should("include", "/lobby");
  });
});
