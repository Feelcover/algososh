import {
  testUrl,
  dataTestCircle,
  dataTestDefault,
  dataTestChanging,
  dataTestModified,
  testArray,
  dataTestContentCircle,
} from "../constants/constants";

describe('Страница "Стек" отображается правильно', () => {
  beforeEach(() => {
    cy.visit(testUrl);
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
    for (let i = 0; i < testArray.length; i++) {
      cy.clock();

      cy.get("input").should("be.empty").type(testArray[i]);
      cy.get("@addButton").should("not.be.disabled").click();
      cy.get(dataTestCircle);
      cy.tick(500);

      cy.get(dataTestCircle).eq(i).should("have.text", testArray[i]);
      cy.get(dataTestContentCircle)
        .eq(i)
        .find(dataTestChanging)
        .parent()
        .should("contain", "top");
      cy.tick(500);

      cy.get(dataTestContentCircle).eq(0).find(dataTestDefault);
    }
  });
  it("Правильность удаления элемента из стека", () => {
    for (let i = 0; i < testArray.length; i++) {
      cy.get("input").should("be.empty").type(testArray[i]);
      cy.get("@addButton").should("not.be.disabled").click();
    }
    cy.get(dataTestCircle).as("circles");
    for (let j = 0; j <= testArray.length; j++) {
      cy.get("@deleteButton").click();
      cy.get("body").then(($body) => {
        if ($body.text().includes(dataTestCircle)) {
          cy.get(dataTestCircle).eq(testArray.length - 1 - j);
          cy.get(dataTestContentCircle).eq(1).find(dataTestChanging);
        }
      });
    }
  });
  it("Правильность очистки из стека", () => {
    for (let i = 0; i < testArray.length; i++) {
      cy.get("input").should("be.empty").type(testArray[i]);
      cy.get("@addButton").should("not.be.disabled").click();
    }
    cy.get("@clearButton").should("not.be.disabled").click();
    cy.get(dataTestCircle).should("have.length", 0);
  });
});
