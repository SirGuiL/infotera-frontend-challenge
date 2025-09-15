import { faker } from "@faker-js/faker";
import { viewports } from "cypress/support/viewports";

viewports.forEach(([device, width, height]) => {
  describe(`SearchEngine - ${device}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);

      cy.intercept("GET", "**/hotels**", {
        fixture: "hotels.json",
      });

      cy.visit(
        "http://localhost:3000/search?destination=Dublin&region=Irlanda&checkin=Mon+Sep+15+2025+11%3A58%3A21+GMT-0300+%28Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia%29&checkout=Mon+Sep+15+2025+11%3A58%3A21+GMT-0300+%28Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia%29&adults=1&children=0"
      );

      cy.get("[data-cy=filter-button]").should("be.visible").click();
    });

    it("should be able to filter by hotel name", () => {
      const hotelName = faker.company.name();

      cy.intercept("GET", "**/hotels**", (req) => {
        expect(req.query).to.have.property("q", hotelName);

        req.reply({
          fixture: "hotels.json",
          statusCode: 200,
        });
      }).as("hotels");

      cy.get("[data-cy=filter-hotel-name]").clear().type(hotelName);

      cy.wait("@hotels");
    });

    it("should be able to filter by price", () => {
      cy.get("[data-cy=min-price-slider]")
        .trigger("mousedown", { button: 0, clientX: 0, clientY: 0 })
        .trigger("mousemove", { clientX: 200, clientY: 0 })
        .trigger("mouseup");
    });

    it("should be able to filter by hotel rating", () => {
      cy.intercept("GET", "**/hotels**").as("hotels");

      cy.contains("1 estrela").click();

      cy.wait("@hotels").then((interception) => {
        expect(interception.request.url).to.include("hotel.stars=1");
      });
    });

    it("should be able to clear filters", () => {
      const hotelName = faker.company.name();

      cy.get("[data-cy=filter-hotel-name]").clear().type(hotelName);

      cy.contains("Limpar filtros").click();

      cy.get("[data-cy=filter-hotel-name]").should("be.empty");
    });
  });
});
