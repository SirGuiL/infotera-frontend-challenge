import { faker } from "@faker-js/faker";
import { viewports } from "cypress/support/viewports";

viewports.forEach(([device, width, height]) => {
  describe(`Checkout - ${device}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);

      cy.intercept("GET", "**/hotels/**", {
        fixture: "hotel.json",
      });

      cy.visit("http://localhost:3000/hotel/1");
    });

    it("should be able to book a room", () => {
      cy.contains("Reservar Agora").first().click();

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const contactName = faker.person.fullName();
      const contactEmail = faker.internet.email();
      const contactPhone = faker.phone.number();

      cy.get("input[name=name]").clear().type(firstName);
      cy.get("input[name=lastName]").clear().type(lastName);

      cy.get("input[name=contactName]").clear().type(contactName);
      cy.get("input[name=contactEmail]").clear().type(contactEmail);
      cy.get("input[name=contactPhone]").clear().type(contactPhone);

      cy.contains("RESERVAR").click();

      cy.contains("Reserva realizada com sucesso!").should("be.visible");
      cy.contains(firstName + " " + lastName).should("be.visible");
      cy.contains(contactName).should("be.visible");
      cy.contains(contactEmail).should("be.visible");
    });

    it("should show errors when trying to reserve without data", () => {
      cy.contains("Reservar Agora").first().click();

      cy.contains("RESERVAR").click();

      cy.contains("O primeiro nome é obrigatório").should("be.visible");
      cy.contains("O sobrenome é obrigatório").should("be.visible");
      cy.contains("O nome de contato é obrigatório").should("be.visible");
      cy.contains("E-mail inválido").should("be.visible");
      cy.contains("Telefone inválido").should("be.visible");
    });
  });
});
