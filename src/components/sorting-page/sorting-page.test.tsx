import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { delay } from "../../utils/delay";
import { SortingPage } from "./sorting-page";
import { oneElementForSort, sortedAsc, sortedDsc } from "./sorting-page-utils";

//Тестовые массивы находятся в sorting-page-utils.ts
//По временным затратам тесты не лучшие вышли, всё из-за анимаций




describe("Корректная работа сортировки", () => {
  it("Пустой массив", () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const emptyArrButton = screen.getByTestId("testEmptyArr");
    const column = screen.queryByTestId("testColumn");
    const ascButton = screen.getByTestId("testASC");
    const dscButton = screen.getByTestId("testDSC");
    fireEvent.click(emptyArrButton);
    expect(column).toBeNull();
    expect(ascButton).toBeDisabled();
    expect(dscButton).toBeDisabled();
  });

  it("Массив из одного элемента выбором", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const oneElementArrButton = screen.getByTestId("testOneElementArr");
    const ascButton = screen.getByTestId("testASC");
    const dscButton = screen.getByTestId("testDSC");
    const choiceTestButton = screen.getByLabelText("Выбор");
    userEvent.click(choiceTestButton);
    expect(choiceTestButton).toBeChecked();
    fireEvent.click(oneElementArrButton);
    userEvent.click(ascButton);
    fireEvent.click(oneElementArrButton);
    userEvent.click(dscButton);
    await waitFor(
      () => {
        const column = screen.getByTestId("testColumn");
        expect(column).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const column = screen.getByTestId("testColumn");
    expect(column.innerHTML).toEqual(`${oneElementForSort[0].number}`);
  });
  it("Массив из одного элемента пузырьком", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const oneElementArrButton = screen.getByTestId("testOneElementArr");
    const ascButton = screen.getByTestId("testASC");
    const dscButton = screen.getByTestId("testDSC");
    const bubbleTestButton = screen.getByLabelText("Пузырёк");
    userEvent.click(bubbleTestButton);
    expect(bubbleTestButton).toBeChecked();
    fireEvent.click(oneElementArrButton);
    userEvent.click(ascButton);
    fireEvent.click(oneElementArrButton);
    userEvent.click(dscButton);
    await waitFor(
      () => {
        const column = screen.getByTestId("testColumn");
        expect(column).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const column = screen.getByTestId("testColumn");
    expect(column.innerHTML).toEqual(`${`${oneElementForSort[0].number}`}`);
  });

  it("Массив из нескольких элементов выбором по возрастанию", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const elementsArrButton = screen.getByTestId("testElementsArr");
    const ascButton = screen.getByTestId("testASC");
    const choiceTestButton = screen.getByLabelText("Выбор");
    userEvent.click(choiceTestButton);
    expect(choiceTestButton).toBeChecked();
    fireEvent.click(elementsArrButton);
    userEvent.click(ascButton);
    await delay(2500);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("testColumn").map(item => item.innerHTML);
        expect(columns).toEqual(sortedAsc);
      },
      { timeout: 1500 }
    );
  });

  it("Массив из нескольких элементов выбором по убыванию", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const elementsArrButton = screen.getByTestId("testElementsArr");
    const dscButton = screen.getByTestId("testDSC");
    const choiceTestButton = screen.getByLabelText("Выбор");
    userEvent.click(choiceTestButton);
    expect(choiceTestButton).toBeChecked();
    fireEvent.click(elementsArrButton);
    userEvent.click(dscButton);
    await delay(2500);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("testColumn").map(item => item.innerHTML);
        expect(columns).toEqual(sortedDsc);
      },
      { timeout: 1500 }
    );
  });

  it("Массив из нескольких элементов пузырьком по возрастанию", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const elementsArrButton = screen.getByTestId("testElementsArr");
    const ascButton = screen.getByTestId("testASC");
    const bubbleTestButton = screen.getByLabelText("Пузырёк");
    userEvent.click(bubbleTestButton);
    expect(bubbleTestButton).toBeChecked();
    fireEvent.click(elementsArrButton);
    userEvent.click(ascButton);
    await delay(2500);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("testColumn").map(item => item.innerHTML);
        expect(columns).toEqual(sortedAsc);
      },
      { timeout: 1500 }
    );
  });

  it("Массив из нескольких элементов выбором по убыванию", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const elementsArrButton = screen.getByTestId("testElementsArr");
    const dscButton = screen.getByTestId("testDSC");
    const bubbleTestButton = screen.getByLabelText("Пузырёк");
    userEvent.click(bubbleTestButton);
    expect(bubbleTestButton).toBeChecked();
    fireEvent.click(elementsArrButton);
    userEvent.click(dscButton);
    await delay(2500);
    await waitFor(
      () => {
        const columns = screen.getAllByTestId("testColumn").map(item => item.innerHTML);
        expect(columns).toEqual(sortedDsc);
      },
      { timeout: 1500 }
    );
  });

});
