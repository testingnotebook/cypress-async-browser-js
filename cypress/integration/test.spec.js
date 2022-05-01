import pWaitFor from "p-wait-for";

it("should invoke function and return event", () => {
  cy.visit("./index.html").then(() => {
    const expected = "Function has now returned a value";
    let result = invokeEvent(expected);
    assertEvent(result, expected);
  });
});

let assertEvent = (event, expectedEvent) => {
  cy.wrap(event).then((actualEvent) => {
    expect(actualEvent).to.eq(expectedEvent);
  });
};

let invokeEvent = async (expected) => {
  return new Cypress.Promise((resolve, reject) => {
    cy.window().then(async (win) => {
      try {
        await pWaitFor(
          async () => {
            return expected == (await win.testSupport());
          },
          { timeout: 2000 }
        );
        resolve(expected);
      } catch (e) {
        reject(`Unable to match result with "${expected}"`);
      }
    });
  });
};
