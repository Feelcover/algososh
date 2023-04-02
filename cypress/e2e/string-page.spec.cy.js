import { testUrl, dataTestCircle, dataTestDefault ,dataTestChanging, dataTestModified} from "../constants/constants";

describe('Страница "Строка" отображается правильно', () => {
	beforeEach(() => {
		cy.visit(testUrl);
		cy.get('[href*="/recursion"]').click()
	})
	it('Кнопка отключена при пустом инпуте', () => {
		cy.get("input").should('have.value', '');
		cy.get("button").should("be.disabled")
	});

	it('Строка разворачивается корректно', () => {
		cy.get("input").type('12345678');
		cy.get("button").eq(1).click();

		cy.get(dataTestCircle)
            .should('have.length', 8)
            .each((el, index) => {
                cy.wrap(el => expect(el).contains(index + 1));
                if (index === 0 || index === 7) {
                    cy.wrap(el).get(dataTestChanging);
                }
                if (index === 1) {
                    cy.wrap(el).get(dataTestDefault);
                }
            });

        cy.get(dataTestCircle)
            .should('have.length', 8)
            .each((el, index) => {
                cy.wrap(el).contains(8 - index);
                cy.wrap(el).get(dataTestModified);
            });
	});

}); 
