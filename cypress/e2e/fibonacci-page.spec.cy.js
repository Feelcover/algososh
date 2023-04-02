import { testUrl } from "../constants/constants";

describe('Страница "Строка" отображается правильно', () => {
	beforeEach(() => {
		cy.visit(testUrl);
		cy.get('[href*="/fibonacci"]').click();
	})
    it('Кнопка отключена при пустом инпуте', () => {
		cy.get("input").should('have.value', '');
		cy.get("button").should("be.disabled")
	});
})