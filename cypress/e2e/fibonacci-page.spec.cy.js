
describe('Страница "Строка" отображается правильно', () => {
	beforeEach(() => {
		cy.visit(testUrl);
		cy.get('[href*="/fibonacci"]').click()
	})
})