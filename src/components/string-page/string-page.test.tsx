import { StringPage } from "./string-page";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const testEvenString = "helloworld";
const testOddString = "hello";
const testOneString = "w";


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
    expect(input).toHaveValue(testEvenString);
    userEvent.click(button);
    await waitFor(
      () => {
        const circles = screen
          .getAllByTestId("testCircle")
          .map((item) => item.textContent);
        expect(circles.join("")).toBe(Array(testEvenString).reverse().join(""));
      },
      { timeout: 1000 }
    );
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
    expect(input).toHaveValue(testOddString);
    userEvent.click(button);
    await waitFor(
      () => {
        const circles = screen
          .getAllByTestId("testCircle")
          .map((item) => item.textContent);
        expect(circles.join("")).toBe(Array(testOddString).reverse().join(""));
      },
      { timeout: 1000 }
    );
  });

  it("с одним символом", async () => {
    render(
      <MemoryRouter>
        <StringPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    userEvent.type(input, testOneString);
    expect(input).toHaveValue(testOneString);
    screen.debug()
    fireEvent.click(button);
    await waitFor(
      () => {
        const circles = screen
          .getAllByTestId("testCircle")
          .map((item) => item.textContent);
        expect(circles.join('')).toBe(testOneString)
      },
      { timeout: 1000 }
    );
  });

  it("с пустой строкой", async () => {
    render(
      <MemoryRouter>
        <StringPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    expect(input).toHaveValue('');
    expect(button).toBeDisabled()
  });
});