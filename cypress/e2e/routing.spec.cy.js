import { testUrl } from "../constants/constants";

describe('Проверка корректной работы маршрутизации', ()=> {
    it('Главная страница доступна', ()=> {
        cy.visit(testUrl);
    });
    it('Страница "Строка" доступна', ()=> {
        cy.visit(`${testUrl}/recursion`);
    });
    it('Страница "Последовательность Фибоначчи" доступна', ()=> {
        cy.visit(`${testUrl}/fibonacci`);
    });
    it('Страница "Сортировка массива" доступна', ()=> {
        cy.visit(`${testUrl}/sorting`);
    });
    it('Страница "Стек" доступна', ()=> {
        cy.visit(`${testUrl}/stack`);
    });
    it('Страница "Очередь" доступна', ()=> {
        cy.visit(`${testUrl}/queue`);
    });
    it('Страница "Связный список" доступна', ()=> {
        cy.visit(`${testUrl}/list`);
    });
})