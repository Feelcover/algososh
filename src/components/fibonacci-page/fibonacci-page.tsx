import React, {
  FormEvent,
  MouseEvent,
  useState,
} from "react";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { inputValue, handleChangeInput, setInputValue } = useForm("0");
  const inputValueToNum = Number(inputValue);

  const fibonacciFunc = async (num: number) => {
    setIsLoading(true);
    let fibArr: number[] = [0, 1];
    for (let i = 2; i <= num; i++) {
      const a = fibArr[i - 1];
      const b = fibArr[i - 2];
      fibArr.push(a + b);
    }
    for (let i = 0; i < num; i++) {
      fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
      setArr(fibArr.slice(0, i + 1));
      await delay(500);
    }
    setIsLoading(false);
  };

  const onClickFibRun = (
    evt: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    if (!isLoading) {
      fibonacciFunc(inputValueToNum);
      setInputValue("");
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(evt) => onClickFibRun(evt)}>
        <Input
          type="number"
          min={1}
          max={19}
          onChange={handleChangeInput}
          placeholder="Введите число"
          isLimitText={true}
          value={inputValue}
          disabled={isLoading}
        />
        <Button
          text="Рассчитать"
          onClick={onClickFibRun}
          isLoader={isLoading}
          disabled={!inputValue || inputValueToNum > 19 || isLoading}
        />
      </form>
      <div className={styles.elements}>
        {arr.map((item, index) => {
          return <Circle letter={`${item}`} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
