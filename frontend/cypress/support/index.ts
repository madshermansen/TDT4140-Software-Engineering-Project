import "./commands";

declare global {
    namespace Cypress {
        interface Chainable {
            getByLabel(value: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
