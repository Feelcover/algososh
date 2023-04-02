import {
    testUrl,
    dataTestCircle,
    dataTestDefault,
    dataTestChanging,
    dataTestModified,
  } from "../constants/constants";
  
  describe('Страница "Очередь" отображается правильно', () => {
    beforeEach(() => {
      cy.visit(testUrl);
      cy.get('[href*="/queue"]').click();
      cy.contains("button", "Добавить").as("addButton");
      cy.contains("button", "Удалить").as("deleteButton");
      cy.contains("button", "Очистить").as("clearButton");
    });
    it("Кнопки отключены при пустом инпуте", () => {
        cy.get("input").should("be.empty")
        cy.get("@addButton").should('be.disabled');
        cy.get("@deleteButton").should('be.disabled');
        cy.get("@clearButton").should('be.disabled');

    });
  

  });
  