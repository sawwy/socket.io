describe("lobby chat spec", () => {
  it("user can write to chat", () => {
    cy.openHomepage();
    cy.get('[data-testid="username-input"]').type("Sploosh{Enter}");
    cy.url().should("include", "/lobby");
    cy.get('[data-testid="chat-input"]').type("Hello Noice!{Enter}");
    cy.get('[data-testid="chat-message-header"]').should("contain", "Sploosh");
    cy.get('[data-testid="chat-message"]').should("contain", "Hello Noice!");
  });
});
