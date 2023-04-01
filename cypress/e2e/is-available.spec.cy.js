import { testUrl } from "../constants/constants";

describe('Сервис работает', () => {
    it('Сервис доступен по localhost:3000', () => {
        cy.visit(testUrl);
    });
});