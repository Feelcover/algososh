import {
  TEST_URL,
  DATA_TEST_CIRCLE,
  DATA_TEST_DEFAULT,
  DATA_TEST_CHANGING,
  TEST_ARR,
  DATA_TEST_CONTENT_CIRCLE,
} from "../constants/constants";

describe('Страница "Стек" отображается правильно', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.get('[href*="/stack"]').click();
    cy.contains("button", "Добавить").as("addButton");
    cy.contains("button", "Удалить").as("deleteButton");
    cy.contains("button", "Очистить").as("clearButton");
  });
  it("Кнопки отключены при пустом инпуте", () => {
    cy.get("input").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("Проверка правильности добавления элемента в стек", () => {
    for (let i = 0; i < TEST_ARR.length; i++) {
      cy.clock();

      cy.get("input").should("be.empty").type(TEST_ARR[i]);
      cy.get("@addButton").should("not.be.disabled").click();
      cy.get(DATA_TEST_CIRCLE);
      cy.tick(500);

      cy.get(DATA_TEST_CIRCLE).eq(i).should("have.text", TEST_ARR[i]);
      cy.get(DATA_TEST_CONTENT_CIRCLE)
        .eq(i)
        .find(DATA_TEST_CHANGING)
        .parent()
        .should("contain", "top");
      cy.tick(500);

      cy.get(DATA_TEST_CONTENT_CIRCLE).eq(0).find(DATA_TEST_DEFAULT);
    }
  });
  it("Правильность удаления элемента из стека", () => {
    for (let i = 0; i < TEST_ARR.length; i++) {
      cy.get("input").should("be.empty").type(TEST_ARR[i]);
      cy.get("@addButton").should("not.be.disabled").click();
    }
    cy.get(DATA_TEST_CIRCLE).as("circles");
    for (let j = 0; j <= TEST_ARR.length; j++) {
      cy.get("@deleteButton").click();
      cy.get("body").then(($body) => {
        if ($body.text().includes(DATA_TEST_CIRCLE)) {
          cy.get(DATA_TEST_CIRCLE).eq(TEST_ARR.length - 1 - j);
          cy.get(DATA_TEST_CONTENT_CIRCLE).eq(1).find(DATA_TEST_CHANGING);
        }
      });
    }
  });
  it("Правильность очистки из стека", () => {
    for (let i = 0; i < TEST_ARR.length; i++) {
      cy.get("input").should("be.empty").type(TEST_ARR[i]);
      cy.get("@addButton").should("not.be.disabled").click();
    }
    cy.get("@clearButton").should("not.be.disabled").click();
    cy.get(DATA_TEST_CIRCLE).should("have.length", 0);
  });
});
