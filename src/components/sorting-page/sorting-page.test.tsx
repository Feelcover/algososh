import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";

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
    //Проверяем, что массив пустой и ничего не отрисовалось
    expect(column).toBeNull();
    expect(ascButton).toBeDisabled();
    expect(dscButton).toBeDisabled();
  });

  it("Массив из одного элемента", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const oneElementArrButton = screen.getByTestId("testOneElementArr");
    const ascButton = screen.getByTestId("testASC");
    const dscButton = screen.getByTestId("testDSC");
    fireEvent.click(oneElementArrButton);
    userEvent.click(ascButton);
    userEvent.click(dscButton);
    await waitFor(
      () => {
        const column = screen.getByTestId("testColumn");
        console.log(column.innerHTML);
        expect(column).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
