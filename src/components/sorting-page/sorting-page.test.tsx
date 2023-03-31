import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";


describe('Корректная работа сортировки', () => {
    it('сортировка пустого массива', async () => {
        render(
            <MemoryRouter>
                <SortingPage/>
            </MemoryRouter>
        )

        
    });
});