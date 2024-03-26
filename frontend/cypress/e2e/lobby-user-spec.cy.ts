describe("lobby user spec", () => {
  it("opens user profile view with correct details", () => {
    cy.openLobby();
    cy.get('[data-testid="lobby-user-button-qwerty"]');
    cy.get('[data-testid="lobby-online-users-heading"]').should(
      "contain",
      "ONLINE - 2"
    );

    cy.get('[data-testid="lobby-offline-users-heading"]').should(
      "contain",
      "OFFLINE - 1"
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
      "1 hour ago"
    );
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "JOINED"
    );
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "3 Mar 2020"
    );
  });

  it("user profile view can be toggled on and off", () => {
    cy.openLobby();
    cy.get('[data-testid="lobby-user-details-qwerty"]').should("not.exist");
    cy.get('[data-testid="lobby-user-button-qwerty"]').click();
    cy.get('[data-testid="lobby-user-details-qwerty"]').should(
      "contain",
      "qwerty"
    );
    cy.get('[data-testid="lobby-user-button-blarblar"]').click();
    cy.get('[data-testid="lobby-user-details-blarblar"]').should(
      "contain",
      "blarblar"
    );
    cy.get('[data-testid="lobby-user-button-blarblar"]').click();
    cy.get('[data-testid="lobby-user-details-qwerty"]').should("not.exist");
    cy.get('[data-testid="lobby-user-button-dendi"]').click();
    cy.get('[data-testid="lobby-user-details-dendi"]').should(
      "contain",
      "dendi"
    );
    cy.get("body").click(0, 0);
    cy.get('[data-testid="lobby-user-details-dendi"]').should("not.exist");
  });
});
