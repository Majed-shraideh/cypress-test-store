/// <reference types = 'Cypress' />

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("test", () => {
  it.skip("test", () => {
    cy.visit("https://global.almosafer.com/en");

    // currency check
    cy.get('[data-testid="Header__CurrencySelector"]').should("contain", "SAR");
    // contact check
    cy.get(".sc-hUfwpO").should("contain", "+966554400000");

    // language check
    cy.get('[data-testid="Header__LanguageSwitch"]').should(
      "contain",
      "العربية"
    );
    cy.get(".sc-jvEmr").find(".cta__saudi").click();

    cy.get("#uncontrolled-tab-example-tab-hotels")
      .should("have.attr", "aria-selected")
      .and("equal", "false");
    cy.get(".sc-dznXNo").should("be.visible");

    const currenDate = new Date();
    const day = currenDate.getDate();

    const expctedForDepature = day + 1;
    const expectedForReturn = day + 2;

    cy.get(
      '[data-testid="FlightSearchBox__FromDateButton"] > .sc-fvLVrH'
    ).should("contain", expctedForDepature);
    cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-fvLVrH').should(
      "contain",
      expectedForReturn
    );
  });
  it("", () => {
    let RandomLanguage = [
      "https://global.almosafer.com/en",
      "https://global.almosafer.com/ar",
    ];
    const randomLanguageUrl =
      RandomLanguage[Math.floor(Math.random() * RandomLanguage.length)];
    cy.visit(randomLanguageUrl);
    cy.get(".sc-jvEmr").find(".cta__saudi").click();

    let RoomVisitor = ["A", "B"];
    let RandomRoom =
      RoomVisitor[Math.floor(Math.random() * RoomVisitor.length)];

    cy.url().then((url) => {
      if (url.includes("ar")) {
        cy.get('[data-testid="Header__LanguageSwitch"]').should(
          "contain",
          "English"
        );
        cy.get("#uncontrolled-tab-example-tab-hotels").click();
        let Hotels = ["جدة", "دبي"];
        let RandomHotels = Hotels[Math.floor(Math.random() * Hotels.length)];
        cy.get('[data-testid="AutoCompleteInput"]').type(RandomHotels);
        cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();
        cy.get(
          '[data-testid="HotelSearchBox__ReservationSelect_Select"]'
        ).select(RandomRoom);
        cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
        let prices = [];
        let lowesPrice, highesPrice;

        cy.get(".Price__Value")
          .each((element) => {
            prices.push(parseInt(element.text()));
          })
          .then(() => {
            lowesPrice = prices[0];
            highesPrice = prices[prices.length - 1];
            expect(highesPrice).to.be.greaterThan(lowesPrice);
            cy.log("lowestprice is" + lowesPrice);
            cy.log("highestprice is" + highesPrice);
            cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]',{timeout:20000}).should('exist').should('be.visible').should('contain','وجدنا')

          });
      } else if (url.includes("en")) {
        cy.get('[data-testid="Header__LanguageSwitch"]').should(
          "contain",
          "العربية"
        );
        cy.get("#uncontrolled-tab-example-tab-hotels").click();
        let Hotels = ["Dubai", "Jeddah", "Riyadh"];
        let RandomHotels = Hotels[Math.floor(Math.random() * Hotels.length)];
        cy.get('[data-testid="AutoCompleteInput"]').type(RandomHotels);
        cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();
        cy.get(
          '[data-testid="HotelSearchBox__ReservationSelect_Select"]'
        ).select(RandomRoom);
        cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
        let prices = [];
        let lowesPrice, highesPrice;

        cy.get(".Price__Value")
          .each((element) => {
            prices.push(parseInt(element.text()));
          })
          .then(() => {
            lowesPrice = prices[0];
            highesPrice = prices[prices.length - 1];
            expect(highesPrice).to.be.greaterThan(lowesPrice);
            cy.log("lowestprice is" + lowesPrice);
            cy.log("highestprice is" + highesPrice);
          });
          cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]',{timeout:20000}).should('exist').should('be.visible').should('contain','found')
      }
    });
  });
});
