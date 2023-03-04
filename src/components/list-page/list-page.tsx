import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { TList } from "../../types/other-types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randArr } from "./list-page-utils";
import styles from "./list-page.module.css";
import List from "./listClass";

export const ListPage: React.FC = () => {
  let randomArray = randArr();
  const list = useMemo(() => {
    return new List<number>(randomArray);
  }, []);
  const newArr: TList[] = randomArray.map((item) => ({
    state: ElementStates.Default,
    el: item,
  }));
  const [arr, setArr] = useState<TList[]>(newArr);
  const [isLoading, setIsLoading] = useState({
    addToHead: false,
    addToTail: false,
    deleteInHead: false,
    deleteInTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");

  const handleChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };
  const handleChangeInputIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(evt.target.value);
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
