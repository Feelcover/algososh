import TestRenderer from "react-test-renderer";
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
});
