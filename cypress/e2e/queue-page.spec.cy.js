import {
  testUrl,
  dataTestCircle,
  defaultStyle,
  changingStyle,
  dataTestForm,
  dataTestInput,
  dataTestAdd,
  dataTestRemove,
  dataTestClear,
} from "../constants/constants";

describe('Страница "Стек" отображается правильно', () => {
  const addFirst = (value) => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).type(value);
      cy.get(dataTestAdd).should("be.not.disabled");
      cy.get(dataTestRemove).should("be.disabled");
      cy.get(dataTestClear).should("be.disabled");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestAdd).click();
      cy.get(dataTestRemove).should("be.disabled");
      cy.get(dataTestClear).should("be.disabled");
    });

    cy.get(dataTestCircle).contains(value).parent().invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));
  };
  const addNext = (value) => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).type(value);
      cy.get(dataTestAdd).should("be.not.disabled");
      cy.get(dataTestRemove).should("be.not.disabled");
      cy.get(dataTestClear).should("be.not.disabled");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestAdd).click();
      cy.get(dataTestRemove).should("be.disabled");
      cy.get(dataTestClear).should("be.disabled");
    });
    cy.get(dataTestCircle).contains(value).parent().invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));
  };

  beforeEach(() => {
    cy.visit(testUrl);
    cy.get('[href*="/queue"]').click();
  });
  it("Кнопки отключены при пустом инпуте", () => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("have.value", "");
      cy.get(dataTestAdd).should("be.disabled");
      cy.get(dataTestRemove).should("be.disabled");
      cy.get(dataTestClear).should("be.disabled");
    });
  });

  it("Проверка правильности добавления элемента в очередь", () => {
    cy.get(dataTestCircle).should("have.length", 7).invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));

    addFirst("5");

    cy.get(dataTestCircle).siblings("div").contains("head");
    cy.get(dataTestCircle).siblings("div").contains("tail");
    cy.get(dataTestCircle).siblings("p").contains("0");

    cy.get(dataTestCircle).invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));

    addNext("6");

    cy.get(dataTestCircle).contains("6").parent("div").nextAll().contains("tail");
    cy.get(dataTestCircle).siblings("p").contains("1");
    cy.get(dataTestCircle).invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));

    addNext("7");

    cy.get(dataTestCircle).contains("7").parent("div").nextAll().contains("tail");
    cy.get(dataTestCircle).siblings("p").contains("2");
    cy.get(dataTestCircle).invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));
  });

  it("Проверка правильности удаления элемента из очереди", () => {
    addFirst("5");
    addNext("6");
    addNext("7");

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("have.value", "");
      cy.get(dataTestAdd).should("be.disabled");
      cy.get(dataTestRemove).click();
    });

    cy.get(dataTestCircle).first().invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));

    cy.get(dataTestCircle).then((elem) => {
      cy.get(elem[0]).children().should("be.empty");
      cy.get(elem[0]).invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));

      cy.get(elem[1]).invoke("attr", "class").then((classList) => expect(classList).contains(changingStyle));
      cy.get(elem[1]).children().should("have.text", "6");

      cy.get(elem[2]).invoke("attr", "class").then((classList) => expect(classList).contains(defaultStyle));
      cy.get(elem[2]).children().should("have.text", "7");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("have.value", "");
      cy.get(dataTestAdd).should("be.disabled");
      cy.get(dataTestRemove).should("be.not.disabled");
      cy.get(dataTestClear).should("be.not.disabled");
    });
  });

  it("Правильное поведение кнопки очистки", () => {
    addFirst("5");
    addNext("6");
    addNext("7");

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("have.value", "");
      cy.get(dataTestAdd).should("be.disabled");
      cy.get(dataTestClear).click();
    });

    cy.get(dataTestCircle).children().next().should("not.exist");
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("have.value", "");
      cy.get(dataTestAdd).should("be.disabled");
      cy.get(dataTestRemove).should("be.disabled");
      cy.get(dataTestClear).should("be.disabled");
    });
  });
});
