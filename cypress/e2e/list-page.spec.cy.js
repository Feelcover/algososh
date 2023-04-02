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

  it('Правильная отрисовка стартовых элементов', function () {
    cy.get(dataTestCircle).should('have.length', 4)
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(defaultStyle))

    cy.get(dataTestCircle).then((e) => {
        cy.get(e[0])
            .children().should('have.text', '85')

        cy.get(e[1])
            .children().should('have.text', '13')

        cy.get(e[2])
            .children().should('have.text', '34')

        cy.get(e[3])
            .children().should('have.text', '7')
    })

    cy.get(dataTestCircle).should('have.length', 4)
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains(defaultStyle))
})
});
