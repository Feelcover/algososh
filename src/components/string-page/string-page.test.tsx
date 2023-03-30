import { StringPage } from "./string-page";
import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";

describe("Корректный разворот строки", () => {
    it("проверяет корректный разворот строки", async () => {
        render(
            <MemoryRouter>
                <StringPage />
            </MemoryRouter>
        );

    });
})