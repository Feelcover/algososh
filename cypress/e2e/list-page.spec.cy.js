import {
  testUrl,
  dataTestCircle,
  defaultStyle,
  changingStyle,
  dataTestForm,
  dataTestInput,
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
  const addHead = (value) => {
    cy.clock();
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).type(value);
      cy.get(dataTestAddTail).should("be.not.disabled");
      cy.get(dataTestAddHead).should("be.not.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestAddHead).click();
      cy.get(dataTestInput).should("be.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.disabled");
      cy.get(dataTestDeleteHead).should("be.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
    cy.get(dataTestCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
  };

  const addTail = (value) => {
    cy.clock();
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).type(value);
      cy.get(dataTestAddTail).should("be.not.disabled");
      cy.get(dataTestAddHead).should("be.not.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");

      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestAddTail).click();
      cy.get(dataTestInput).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.disabled");
      cy.get(dataTestDeleteHead).should("be.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
    cy.get(dataTestCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(defaultStyle));
  };

  const addIndex = (value, index) => {
    cy.clock();
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).type(value);
      cy.get(dataTestAddTail).should("be.not.disabled");
      cy.get(dataTestAddHead).should("be.not.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).type(index);

      cy.get(dataTestDeleteByIndex).should("be.not.disabled");
    });

    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestAddIndex).click();
      cy.get(dataTestInputIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestInput).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.disabled");
      cy.get(dataTestDeleteHead).should("be.disabled");
    });
    cy.get(dataTestCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
  };

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

  it("Правильная отрисовка стартовых элементов", () => {
    cy.get(dataTestCircle)
      .should("have.length", 4)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(defaultStyle));

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");

      cy.get(e[1]).children().should("have.text", "13");

      cy.get(e[2]).children().should("have.text", "34");

      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.get(dataTestCircle)
      .should("have.length", 4)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(defaultStyle));
  });
  it("Корректное добавление элемента в head.", () => {
    addHead("13");
    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_small"));

      cy.get(e[1]).children().should("have.text", "85");
      cy.get(e[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[2]).children().should("have.text", "13");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));
    });

    cy.get(dataTestCircle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(changingStyle));
  });

  it("Корректное добавление элемента в tail", () => {
    addTail("13");
    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[3]).children().should("have.text", "13");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingStyle));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));
    });

    cy.get(dataTestCircle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(defaultStyle));
  });

  it("Корректное добавления элемента по индексу", () => {
    addIndex("13", 2);
    cy.wait(500);
    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingStyle));

      cy.get(e[1]).children().should("have.text", "85");
      cy.get(e[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingStyle));

      cy.get(e[2]).children().should("have.text", "13");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));
    });

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingStyle));

      cy.get(e[1]).children().should("have.text", "85");
      cy.get(e[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingStyle));

      cy.get(e[2]).children().should("have.text", "13");
      cy.get(e[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[3]).children().should("have.text", "34");
      cy.get(e[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));

      cy.get(e[4]).children().should("have.text", "7");
      cy.get(e[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultStyle));
    });

    cy.get(dataTestCircle)
      .should("have.length", 5)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
  });

  it("Корректное удаление элемента из head.", () => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("be.not.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestDeleteHead).click();
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestInput).should("be.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "13");
      cy.get(e[1]).children().should("have.text", "34");
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("be.not.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
  });

  it("Корректное удаление элемента из tail.", () => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("be.not.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestDeleteTail).click();
      cy.get(dataTestDeleteHead).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestInput).should("be.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("be.not.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.disabled");
    });
  });

  it("Корректное удаление элемента по индексу..", () => {
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("be.not.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).type("1");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.not.disabled");
    });

    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestDeleteByIndex).click();
      cy.get(dataTestInputIndex).should("be.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
    });
    cy.get(dataTestForm).within(() => {
      cy.get(dataTestDeleteTail).should("be.disabled");
      cy.get(dataTestDeleteHead).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestInput).should("be.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "13");
      cy.get(e[2]).children().should("have.text", "34");
      cy.get(e[3]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "34");
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.wait(500);

    cy.get(dataTestCircle).then((e) => {
      cy.get(e[0]).children().should("have.text", "85");
      cy.get(e[1]).children().should("have.text", "34");
      cy.get(e[2]).children().should("have.text", "7");
    });

    cy.get(dataTestForm).within(() => {
      cy.get(dataTestInput).should("be.not.disabled");
      cy.get(dataTestAddTail).should("be.disabled");
      cy.get(dataTestAddHead).should("be.disabled");
      cy.get(dataTestDeleteTail).should("be.not.disabled");
      cy.get(dataTestDeleteHead).should("be.not.disabled");
    });
    cy.get(dataTestFormIndex).within(() => {
      cy.get(dataTestInputIndex).should("be.not.disabled");
      cy.get(dataTestAddIndex).should("be.disabled");
      cy.get(dataTestDeleteByIndex).should("be.not.disabled");
    });

    cy.get(dataTestCircle)
      .should("have.length", 3)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(defaultStyle));
  });
});
