import TestRenderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("Корректная работа Circle", () => {
  it("Circle без буквы", () => {
    const circle = TestRenderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle c буквами", () => {
    const circle = TestRenderer.create(<Circle letter="test" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle c head", () => {
    const circle = TestRenderer.create(<Circle head={"11"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с react-элементом в head", () => {
    const circle = TestRenderer.create(
      <Circle head={<Circle isSmall={true} />} />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle c tail", () => {
    const circle = TestRenderer.create(<Circle tail={"11"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с react-элементом в tail", () => {
    const circle = TestRenderer.create(
      <Circle tail={<Circle isSmall={true} />} />
    ).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle c индексом", () => {
    const circle = TestRenderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с пропом isSmall ===  true", () => {
    const circle = TestRenderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle в состоянии default", () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle в состоянии changing", () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle в состоянии modified", () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});

