import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { TList } from "../../types/other-types";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import List from "./listClass";

const initialArray = ["85", "13", "34", "7"];
const list = new List<string>(initialArray);

export const ListPage: React.FC = () => {
  const listArr: TList[] = initialArray.map((item) => ({
    value: item,
    state: ElementStates.Default,
    Element: null,
  }));
  const [arr, setArr] = useState<TList[]>(listArr);
  const [isLoading, setIsLoading] = useState({
    addToHead: false,
    addToTail: false,
    deleteInHead: false,
    deleteInTail: false,
    addByIndex: false,
    deleteByIndex: false,
    disabled: false,
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");

  const handleChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };
  const handleChangeInputIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(evt.target.value);
  };

  const onAddToHead = async () => {
    setIsLoading({ ...isLoading, addToHead: true, disabled: true });
    list.addToHead(inputValue);
    if (arr.length > 0) {
      arr[0].Element = {
        value: inputValue,
        state: ElementStates.Changing,
        position: "add",
      };
    }
    setArr([...arr]);
    await delay(500);
    arr[0].Element = null;
    arr.unshift({
      ...arr[0],
      value: inputValue,
      state: ElementStates.Modified,
    });
    setArr([...arr]);
    await delay(500);
    arr[0].state = ElementStates.Default;
    setArr([...arr]);
    setIsLoading({ ...isLoading, addToHead: false, disabled: false });
    setInputValue("");
  };

  const onAddToTail = async () => {
    setInputValue("");
    setIsLoading({ ...isLoading, addToTail: true, disabled: true });
    list.addToTail(inputValue);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      Element: {
        value: inputValue,
        state: ElementStates.Changing,
        position: "add",
      },
    };
    setArr([...arr]);
    await delay(500);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      Element: null,
    };

    arr.push({
      value: inputValue,
      state: ElementStates.Modified,
      Element: null,
    });
    setArr([...arr]);
    await delay(500);
    arr[arr.length - 1].state = ElementStates.Default;
    setArr([...arr]);
    setIsLoading({ ...isLoading, addToTail: false, disabled: false });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.upForm}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            onChange={handleChangeInputValue}
            value={inputValue}
            maxLength={4}
            isLimitText={true}
          />
          <Button
            text="Добавить в head"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
          <Button
            text="Добавить в tail"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
          <Button
            text="Удалить из head"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
          <Button
            text="Удалить из tail"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
        </div>
        <form className={styles.downForm}>
          <Input
            min={0}
            // max={}
            type="number"
            placeholder="Введите индекс"
            onChange={handleChangeInputIndex}
            value={inputIndex}
          />
          <Button
            text="Добавить по индексу"
            type="button"
            // onClick={}
            // isLoader={}
            // disabled={}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            // onClick={}
            // isLoader={}
            // disabled={}
          />
        </form>
        <ul className={styles.elements}>
          <li className={styles.element}>
            <Circle
              extraClass={styles.upElement}
              isSmall={true}
              state={ElementStates.Changing}
            />
            <Circle head={"head"} />
            <ArrowIcon />
          </li>
          <li className={styles.element}>
            <Circle />
            <ArrowIcon />
          </li>
          <li className={styles.element}>
            <Circle tail={"tail"} />
            <ArrowIcon />
            <Circle extraClass={styles.downElement} isSmall={true} />
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
