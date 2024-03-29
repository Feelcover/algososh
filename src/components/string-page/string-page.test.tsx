import { StringPage } from "./string-page";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { delay } from "../../utils/delay";

const testEvenString = "1234";
const testEvenReversedString = "4321";

const testOddString = "12345";
const testOddReversedString = "54321";



describe("Корректный разворот строки", () => {
  it("с чётным количеством символов", async () => {
    render(
      <MemoryRouter>
        <StringPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");

    userEvent.type(input, testEvenString);
    expect(button).toBeEnabled()
    expect(input).toHaveValue(testEvenString);
    userEvent.click(button);
    await delay(500)
    await waitFor(
      () => {
        const circles = screen
          .getAllByTestId("testCircle")
          .map((item) => item.textContent);  
          console.log(circles.join(""));
                  
        expect(circles.join("")).toBe(testEvenReversedString);

      },
      { timeout: 1000 }
    );
    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });

  it("с нечётным количеством символов", async () => {
    render(
      <MemoryRouter>
        <StringPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");

    userEvent.type(input, testOddString);
    expect(button).toBeEnabled()
    expect(input).toHaveValue(testOddString);
    userEvent.click(button);
    await delay(500)
    await waitFor(
      () => {
        const circles = screen
          .getAllByTestId("testCircle")
          .map((item) => item.textContent);
        expect(circles.join("")).toEqual(testOddReversedString);
      },
      { timeout: 1000 }
    );
    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });

  it("с одним символом", async () => {
    render(
      <MemoryRouter>
        <StringPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    userEvent.type(input, 'q');
    expect(button).toBeEnabled()
    expect(input).toHaveValue('q');
    fireEvent.click(button);
    await waitFor(
      () => {
        const circles = screen
          .getAllByTestId("testCircle")
          .map((item) => item.textContent);
        expect(circles.join('')).toBe('q')
      },
      { timeout: 1000 }
    );
    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });

  it("с пустой строкой", async () => {
    render(
      <MemoryRouter>
        <StringPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    const circles = screen.queryByTestId("testCircle")
    expect(circles).toBeNull();
    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });
});