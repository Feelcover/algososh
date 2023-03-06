import { FormEvent, MouseEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { TStringArr } from "../../types/other-types";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string-page.module.css";
import { swap } from "../../utils/swap";
import { useForm } from "../../hooks/useForm";

export const StringPage: React.FC = () => {
  const [arr, setArr] = useState<Array<TStringArr>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { inputValue, handleChangeInput, setInputValue } = useForm("");

  const stringReverse = async (arr: TStringArr[]) => {
    setIsLoading(true);
    for (let i = 0; i < Math.ceil(arr.length / 2); i++) {
      const j = arr.length - 1 - i;
      if (arr.length === 1) {
        arr[i].color = ElementStates.Modified;
      } else if (i < j) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(1000);
      }
      swap(arr, i, j);
      arr[i].color = ElementStates.Modified;
      arr[j].color = ElementStates.Modified;
      setArr([...arr]);
    }
    setIsLoading(false);
  };

  const onClickReverse = (
    evt: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    if (!isLoading && inputValue.length > 0) {
      const arr = inputValue
        .split("")
        .map((value) => ({ value, color: ElementStates.Default }));
      stringReverse(arr);
      setInputValue("");
    }
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(evt) => onClickReverse(evt)}>
          <Input
            maxLength={11}
            onChange={handleChangeInput}
            extraClass={styles.input}
            isLimitText={true}
            value={inputValue}
            disabled={isLoading}
          />
          <Button
            text="Развернуть"
            onClick={(evt) => onClickReverse(evt)}
            extraClass={styles.button}
            isLoader={isLoading}
            disabled={!inputValue || inputValue.length < 2 || isLoading}
          />
        </form>
        <ul className={styles.elements}>
          {arr.map((item, index) => {
            return (
              <Circle key={index} letter={item.value} state={item.color} />
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
