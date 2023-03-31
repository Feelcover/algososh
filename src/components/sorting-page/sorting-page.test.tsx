import {
  fireEvent,
  getAllByLabelText,
  getByLabelText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ElementStates } from "../../types/element-states";
import { SortingPage } from "./sorting-page";

export const oneElementForSort = [{ number: 18, state: ElementStates.Default }];
export const elementsForSort = [
  { number: 28, state: ElementStates.Default },
  { number: 100, state: ElementStates.Default },
  { number: 2, state: ElementStates.Default },
  { number: 10, state: ElementStates.Default }
];
export const sorted = [
    { number: 2, state: ElementStates.Default },
    { number: 10, state: ElementStates.Default },
    { number: 28, state: ElementStates.Default },
    { number: 100, state: ElementStates.Default }
  ];

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
        console.log(column.innerHTML);
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
        console.log(column.innerHTML);
        expect(column).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const column = screen.getByTestId("testColumn");
    expect(column.innerHTML).toEqual(`${`${oneElementForSort[0].number}`}`);
  });


});
