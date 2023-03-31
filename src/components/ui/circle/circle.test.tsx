import TestRenderer from "react-test-renderer";
import { Circle } from "./circle";


describe("Корректная работа Circle", () => {
    it("Circle без буквы", () => {
        const circle = TestRenderer.create(<Circle/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Circle c буквами", () => {
        const circle = TestRenderer.create(<Circle/>).toJSON();
        expect(circle).toMatchSnapshot();
    });
})