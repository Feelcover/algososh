import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { click } from "@testing-library/user-event/dist/click";
import { MemoryRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";

describe("Корректная работа сортировки", () => {
  it("Пустой массив", async () => {
    render(
      <MemoryRouter>
        <SortingPage />
      </MemoryRouter>
    );
    const column = screen.queryByTestId("testColumn");
    expect(column).toBeNull();
    const ascButton = screen.getByTestId("testASC");
    const dscButton = screen.getByTestId("testDSC");
    expect(ascButton).toBeDisabled;
    expect(dscButton).toBeDisabled;
  });
});
