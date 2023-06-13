import React from "react";
import LocalCard from "./index";

describe("<LocalCard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LocalCard />);
    cy.contains("HORÁRIOS DISPONÍVEIS");
  });
});
