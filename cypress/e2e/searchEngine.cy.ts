import { format } from "date-fns";
import { viewports } from "cypress/support/viewports";

viewports.forEach(([device, width, height]) => {
  describe(`SearchEngine - ${device}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);

      cy.intercept("GET", "**/suggestions**", {
        fixture: "suggestions.json",
      });

      cy.visit("http://localhost:3000/");
    });

    it("should show a warning toast when there is no destination selected", () => {
      cy.contains("Pesquisar").click();

      cy.contains("Selecione um destino para continuar").should("be.visible");
    });

    it("should be able to select a destination", () => {
      cy.get("input[name=destination]").focus();
      cy.contains("Dublin").first().click();

      cy.get("input[name=destination]").should("have.value", "Dublin");
    });

    it("should be able to select a checkin date", () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      cy.contains("Entrada").click();
      cy.contains(tomorrow.getDate().toString()).first().click();

      cy.contains(format(tomorrow, "dd/MM/yyyy")).should("be.visible");
    });

    it("should be able to select a checkout date", () => {
      const today = new Date();
      const twoDaysLater = new Date(today);
      twoDaysLater.setDate(today.getDate() + 2);

      cy.contains("Saída").click();
      cy.contains(twoDaysLater.getDate().toString()).first().click();

      cy.contains(format(twoDaysLater, "dd/MM/yyyy")).should("be.visible");
    });

    it("should be able to select a number of guests", () => {
      cy.contains("Hóspedes").click();

      cy.get("[data-cy=add-adult-button]").click();
      cy.get("[data-cy=add-children-button]").click();

      cy.contains("Aplicar").should("be.visible").click();

      cy.contains("2 Adultos, 2 Quartos").should("be.visible");
    });
  });
});
