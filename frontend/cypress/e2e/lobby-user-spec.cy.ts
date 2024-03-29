import { getJoinedText } from "~/utils/textUtils";

describe("lobby user spec", () => {
  it("opens user profile view with correct details", () => {
    cy.openHomepage();
    cy.get('[data-testid="username-input"]').type("qwerty{Enter}");
    cy.url().should("include", "/lobby");
    cy.get('[data-testid="lobby-user-button-qwerty"]');
    cy.get('[data-testid="lobby-online-users-heading"]').should(
      "contain",
      "ONLINE - 1"
    );
    cy.get('[data-testid="lobby-user-button-qwerty"]').click();
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "qwerty"
    );
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "LAST SEEN"
    );
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "< 1 hour ago"
    );
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "JOINED"
    );
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      getJoinedText(new Date())
    );
  });

  it("user profile view can be toggled on and off", () => {
    cy.openHomepage();
    cy.get('[data-testid="username-input"]').type("koolaid{Enter}");
    cy.get('[data-testid="lobby-user-details-koolaid"]').should("not.exist");
    cy.get('[data-testid="lobby-user-button-koolaid"]').click();
    cy.get('[data-testid="lobby-user-details-koolaid"]').should(
      "contain",
      "koolaid"
    );
    cy.get("body").click(0, 0);
    cy.get('[data-testid="lobby-user-details-koolaid"]').should("not.exist");
  });
});
