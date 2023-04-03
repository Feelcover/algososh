import {
  TEST_URL,
  DATA_TEST_CIRCLE,
  DEFAULT_STYLE,
  CHANGING_STYLE,
  DATA_TEST_FORM,
  DATA_TEST_INPUT,
  DATA_TEST_ADD,
  DATA_TEST_DELETE,
  DATA_TEST_CLEAR,
} from "../constants/constants";

describe('Страница "Очередь" отображается правильно', () => {
  const addFirst = (value) => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).type(value);
      cy.get(DATA_TEST_ADD).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE).should("be.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.disabled");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_ADD).click();
      cy.get(DATA_TEST_DELETE).should("be.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.disabled");
    });

    cy.get(DATA_TEST_CIRCLE).contains(value).parent().invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));
  };
  const addNext = (value) => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).type(value);
      cy.get(DATA_TEST_ADD).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE).should("be.not.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.not.disabled");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_ADD).click();
      cy.get(DATA_TEST_DELETE).should("be.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.disabled");
    });
    cy.get(DATA_TEST_CIRCLE).contains(value).parent().invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));
  };

  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.get('[href*="/queue"]').click();
  });
  it("Кнопки отключены при пустом инпуте", () => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("have.value", "");
      cy.get(DATA_TEST_ADD).should("be.disabled");
      cy.get(DATA_TEST_DELETE).should("be.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.disabled");
    });
  });

  it("Проверка правильности добавления элемента в очередь", () => {
    cy.get(DATA_TEST_CIRCLE).should("have.length", 7).invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));

    addFirst("5");

    cy.get(DATA_TEST_CIRCLE).siblings("div").contains("head");
    cy.get(DATA_TEST_CIRCLE).siblings("div").contains("tail");
    cy.get(DATA_TEST_CIRCLE).siblings("p").contains("0");

    cy.get(DATA_TEST_CIRCLE).invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));

    addNext("6");

    cy.get(DATA_TEST_CIRCLE).contains("6").parent("div").nextAll().contains("tail");
    cy.get(DATA_TEST_CIRCLE).siblings("p").contains("1");
    cy.get(DATA_TEST_CIRCLE).invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));

    addNext("7");

    cy.get(DATA_TEST_CIRCLE).contains("7").parent("div").nextAll().contains("tail");
    cy.get(DATA_TEST_CIRCLE).siblings("p").contains("2");
    cy.get(DATA_TEST_CIRCLE).invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));
  });

  it("Проверка правильности удаления элемента из очереди", () => {
    addFirst("5");
    addNext("6");
    addNext("7");

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("have.value", "");
      cy.get(DATA_TEST_ADD).should("be.disabled");
      cy.get(DATA_TEST_DELETE).click();
    });

    cy.get(DATA_TEST_CIRCLE).first().invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("be.empty");
      cy.get(e[0]).invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[1]).invoke("attr", "class").then((classList) => expect(classList).contains(CHANGING_STYLE));
      cy.get(e[1]).children().should("have.text", "6");

      cy.get(e[2]).invoke("attr", "class").then((classList) => expect(classList).contains(DEFAULT_STYLE));
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("have.value", "");
      cy.get(DATA_TEST_ADD).should("be.disabled");
      cy.get(DATA_TEST_DELETE).should("be.not.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.not.disabled");
    });
  });

  it("Правильное поведение кнопки очистки", () => {
    addFirst("5");
    addNext("6");
    addNext("7");

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("have.value", "");
      cy.get(DATA_TEST_ADD).should("be.disabled");
      cy.get(DATA_TEST_CLEAR).click();
    });

    cy.get(DATA_TEST_CIRCLE).children().next().should("not.exist");
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("have.value", "");
      cy.get(DATA_TEST_ADD).should("be.disabled");
      cy.get(DATA_TEST_DELETE).should("be.disabled");
      cy.get(DATA_TEST_CLEAR).should("be.disabled");
    });
  });
});
