describe("lobby chat spec", () => {
  beforeEach(() => {
    cy.request("http://localhost:3500/flushUsers");
  });
  it("user can write to chat", () => {
    cy.openHomepage();
    cy.get('[data-testid="username-input"]').type("Sploosh{Enter}");
    cy.url().should("include", "/lobby");
    cy.get('[data-testid="chat-input"]').type("Hello Noice!{Enter}");
    cy.get('[data-testid="chat-usermessage-header"]').should(
      "contain",
      "Sploosh"
    );
    cy.get('[data-testid="chat-usermessage"]').should(
      "contain",
      "Hello Noice!"
    );
  });
  it("shows other user joining and sent message", () => {
    cy.openHomepage();
    cy.get('[data-testid="username-input"]').type("Sploosh{Enter}");
    cy.url().should("include", "/lobby");
    cy.get('[data-testid="chat-input"]').type("Hello Noice!{Enter}");
    const secondName = "Michael Rosen";
    cy.task("handshake", secondName);
    cy.get('[data-testid="chat-systemmessage"]').should(
      "contain",
      "Michael Rosen has joined the lobby, Hooray!"
    );
    cy.task("say", { username: "Michael Rosen", message: "Wuddup?" });
    cy.get('[data-testid="chat-usermessage"]').should(
      "contain",
      "Hello Noice!"
    );
    cy.task("disconnect");
  });
});
