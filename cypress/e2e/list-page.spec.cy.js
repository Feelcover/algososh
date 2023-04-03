import {
  TEST_URL,
  DATA_TEST_CIRCLE,
  DEFAULT_STYLE,
  CHANGING_STYLE,
  DATA_TEST_FORM,
  DATA_TEST_INPUT,
  DATA_TEST_FORM_INDEX,
  DATA_TEST_ADD_HEAD,
  DATA_TEST_DELETE_HEAD,
  DATA_TEST_ADD_INDEX,
  DATA_TEST_DELETE_INDEX,
  DATA_TEST_ADD_TAIL,
  DATA_TEST_DELETE_TAIL,
  DATA_TEST_INPUT_INDEX,
} from "../constants/constants";

describe('Страница "Связный список" отображается правильно', () => {
  const addHead = (value) => {
    
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).type(value);
      cy.get(DATA_TEST_ADD_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_ADD_HEAD).click();
      cy.get(DATA_TEST_INPUT).should("be.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
    cy.get(DATA_TEST_CIRCLE)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
  };

  const addTail = (value) => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).type(value);
      cy.get(DATA_TEST_ADD_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_ADD_TAIL).click();
      cy.get(DATA_TEST_INPUT).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
    cy.get(DATA_TEST_CIRCLE)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(CHANGING_STYLE));
  };

  const addIndex = (value, index) => {
    
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).type(value);
      cy.get(DATA_TEST_ADD_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).type(index);

      cy.get(DATA_TEST_DELETE_INDEX).should("be.not.disabled");
    });

    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_ADD_INDEX).click();
      cy.get(DATA_TEST_INPUT_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_INPUT).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.disabled");
    });
    cy.get(DATA_TEST_CIRCLE)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
  };

  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.get('[href*="/list"]').click();
  });
  it("Кнопки отключены при пустом инпуте", () => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("have.value", "");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("have.value", "0");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
  });

  it("Правильная отрисовка стартовых элементов", () => {
    cy.get(DATA_TEST_CIRCLE)
      .should("have.length", 4)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(DEFAULT_STYLE));

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");

      cy.get(e[1]).children().should("have.text", "13");

      cy.get(e[2]).children().should("have.text", "34");

      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.get(DATA_TEST_CIRCLE)
      .should("have.length", 4)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(DEFAULT_STYLE));
  });
  it("Правильное добавление элемента в head.", () => {
    addHead("13");
    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_small"));

      cy.get(e[1]).children().should("have.text", "85");
      cy.get(e[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[2]).children().should("have.text", "13");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));
    });

    cy.get(DATA_TEST_CIRCLE)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(CHANGING_STYLE));
  });

  it("Правильное добавление элемента в tail", () => {
    addTail("7");
    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[3]).children().should("have.text", "7");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(CHANGING_STYLE));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));
    });

    cy.get(DATA_TEST_CIRCLE)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(DEFAULT_STYLE));
  });

  it("Правильное добавление элемента по индексу", () => {
    addIndex("13", 2);
    cy.wait(500);
    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(CHANGING_STYLE));

      cy.get(e[1]).children().should("have.text", "85");
      cy.get(e[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(CHANGING_STYLE));

      cy.get(e[2]).children().should("have.text", "13");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));
    });

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(CHANGING_STYLE));

      cy.get(e[1]).children().should("have.text", "85");
      cy.get(e[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(CHANGING_STYLE));

      cy.get(e[2]).children().should("have.text", "13");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(DEFAULT_STYLE));
    });

    cy.get(DATA_TEST_CIRCLE)
      .should("have.length", 5)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
  });

  it("Правильное удаление элемента из head.", () => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_DELETE_HEAD).click();
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_INPUT).should("be.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[1]).children().should("have.text", "34");
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
  });

  it("Правильное удаление элемента из tail.", () => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_DELETE_TAIL).click();
      cy.get(DATA_TEST_DELETE_HEAD).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_INPUT).should("be.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.disabled");
    });
  });

  it("Правильное удаление элемента по индексу", () => {
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).type("1");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.not.disabled");
    });

    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_DELETE_INDEX).click();
      cy.get(DATA_TEST_INPUT_INDEX).should("be.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
    });
    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_DELETE_TAIL).should("be.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_INPUT).should("be.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "");
      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[4]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "34");
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(DATA_TEST_CIRCLE).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "34");
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.get(DATA_TEST_FORM).within(() => {
      cy.get(DATA_TEST_INPUT).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_TAIL).should("be.disabled");
      cy.get(DATA_TEST_ADD_HEAD).should("be.disabled");
      cy.get(DATA_TEST_DELETE_TAIL).should("be.not.disabled");
      cy.get(DATA_TEST_DELETE_HEAD).should("be.not.disabled");
    });
    cy.get(DATA_TEST_FORM_INDEX).within(() => {
      cy.get(DATA_TEST_INPUT_INDEX).should("be.not.disabled");
      cy.get(DATA_TEST_ADD_INDEX).should("be.disabled");
      cy.get(DATA_TEST_DELETE_INDEX).should("be.not.disabled");
    });

    cy.get(DATA_TEST_CIRCLE)
      .should("have.length", 3)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(DEFAULT_STYLE));
  });
});
