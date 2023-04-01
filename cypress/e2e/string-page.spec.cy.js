import { dataTestInput, testUrl } from "../constants/constants";

// describe('Страница "Строка" отображается правильно', () => {
// //   beforeEach(() => {
// //     cy.get(`${testUrl}/recursion`);
// //     cy.get(dataTestInput).as("input");
// //     cy.get("input").should('have.value', '');
// //     cy.get("button").as("button");
// //   });

//   it("Кнопка отключена при пустом инпуте", () => {
//     cy.visit('[href="/recursion"]');
//     // cy.get('a[href*="/recursion"]').click()
//     // cy.get("@button").should("be.disabled")
//   });
// });

describe('Страница "Строка" отображается правильно', () => {
	beforeEach(() => {
		cy.visit(testUrl);
		cy.get('[href*="/recursion"]').click()
		cy.get('input').as("input");
		cy.get("button").as("button")
	})
	it('Кнопка отключена при пустом инпуте', () => {
		cy.get("input").should('have.value', '');
		cy.get("@button").should("be.disabled")
	});

}); 
