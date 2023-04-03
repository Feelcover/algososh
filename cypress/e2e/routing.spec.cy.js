import { TEST_URL } from "../constants/constants";

describe("Проверка корректной работы маршрутизации", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });
  it('Страница "Строка" доступна', () => {
    cy.get("[href*='/recursion']").click();
    cy.contains("Строка");
    cy.contains("К оглавлению");
  });
  it('Страница "Последовательность Фибоначчи" доступна', () => {
    cy.get("[href*='/fibonacci']").click();
    cy.contains("Последовательность Фибоначчи");
    cy.contains("К оглавлению");
  });
  it('Страница "Сортировка массива" доступна', () => {
    cy.get("[href*='/sorting']").click();
    cy.contains("Сортировка массива");
    cy.contains("К оглавлению");
  });
  it('Страница "Стек" доступна', () => {
    cy.get("[href*='/stack']").click();
    cy.contains("Стек");
    cy.contains("К оглавлению");
  });
  it('Страница "Очередь" доступна', () => {
    cy.get("[href*='/queue']").click();
    cy.contains("Очередь");
    cy.contains("К оглавлению");
  });
  it('Страница "Связный список" доступна', () => {
    cy.get("[href*='/list']").click();
    cy.contains("Связный список");
    cy.contains("К оглавлению");
  });
});
