import {
  testUrl,
  dataTestCircle,
  defaultStyle,
  changingStyle,
  dataTestForm,
  dataTestInput,
  dataTestAdd,
  dataTestDelete,
  dataTestClear,
  dataTestFormIndex,
  dataTestAddHead,
  dataTestDeleteHead,
  dataTestAddIndex,
  dataTestDeleteByIndex,
  dataTestAddTail,
  dataTestDeleteTail,
  dataTestInputIndex,
} from "../constants/constants";

describe('Страница "Связный список" отображается правильно', () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.get('[href*="/list"]').click();
  });
  it("Кнопки отключены при пустом инпуте", () => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("have.value", "");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("have.value", "0");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
  });
});
