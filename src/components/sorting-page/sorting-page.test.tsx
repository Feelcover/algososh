import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";

describe("Корректная работа сортировки", () => {
  it("Пустой массив", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const emptyArrButton = screen.getByTestId("testEmptyArr")
    const column = screen.queryByTestId("testColumn");
    const ascButton = screen.getByTestId("testASC");
    const dscButton = screen.getByTestId("testDSC");
    fireEvent.click(emptyArrButton)
    expect(column).toBeNull();
    expect(ascButton).toBeDisabled();
    expect(dscButton).toBeDisabled();
  });


});
