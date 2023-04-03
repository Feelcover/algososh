import { TEST_URL } from "../constants/constants";

describe('Сервис работает', () => {
    it('Сервис доступен по localhost:3000', () => {
        cy.visit(TEST_URL);
    });
});