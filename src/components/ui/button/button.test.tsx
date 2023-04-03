import { render,screen ,fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { Direction } from "../../../types/direction";
import { Button } from "./button";

describe("Корректная работа Button", () => {
  it("Button c текстом", () => {
    const button = TestRenderer.create(<Button text={"test"} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Button без текста", () => {
    const button = TestRenderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button disabled", () => {
    const button = TestRenderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button состояния загрузки", () => {
    const button = TestRenderer.create(<Button isLoader = {true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Button c сортировкой по возрастанию рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button sorting={Direction.Ascending} />).toJSON()
		expect(button).toMatchSnapshot()
	});
  it('Button c сортировкой по убыванию рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button sorting={Direction.Descending} />).toJSON()
		expect(button).toMatchSnapshot()
	});
  it('Button списка маленькая рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button linkedList='small' />).toJSON()
		expect(button).toMatchSnapshot()
	});
  it('Button списка большая рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button linkedList='big'/>).toJSON()
		expect(button).toMatchSnapshot()
	});
  it('Нажатие на кнопку вызывает функцию', () => {
		window.alert = jest.fn();
		render(<Button text='Вызов функции' onClick={() => { alert('Успешный вызов функции') }} />)
		const button = screen.getByText("Вызов функции");
		fireEvent.click(button);
		expect(window.alert).toHaveBeenCalledWith('Успешный вызов функции');
	});
});
