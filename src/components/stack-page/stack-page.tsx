import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import Stack from "./stackClass";

export const StackPage: React.FC = () => {
  const stack = useMemo(() => {
    return new Stack<string>();
  }, []);

  const [arr, setArr] = useState<string[]>([]);
  const [status, setStatus] = useState<ElementStates>(ElementStates.Default);

  const [inputValue, setInputValue] = useState<string>("");
  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onClickAdd = async () => {
    stack.push(inputValue);
    setInputValue("");
    await delay(500);
    setStatus(ElementStates.Changing);
    setArr([...stack.get()]);
    await delay(500);
    setStatus(ElementStates.Default);
    setArr([...stack.get()]);
  };

  const onClickDelete = async () => {
    setStatus(ElementStates.Changing);
    setArr([...stack.get()]);
    await delay(500);
    stack.delete();
    setStatus(ElementStates.Default);
    setArr([...stack.get()]);
  };

  const onClickClear = () => {
    stack.clear();
    setArr([]);
  };

  useEffect(() => {
    function handleEnterKeydown(evt: KeyboardEvent) {
      if (evt.key === "Enter" && inputValue.length > 0) {
        onClickAdd();
      }
    }
    document.addEventListener("keydown", handleEnterKeydown);
    return () => {
      document.removeEventListener("keydown", handleEnterKeydown);
    };
  }, [inputValue]);

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.form}>
          <Input
            onChange={handleChangeInput}
            isLimitText={true}
            maxLength={4}
            value={inputValue}
          />
          <Button text="Добавить" disabled={!inputValue} onClick={onClickAdd} />
          <Button text="Удалить" disabled={!arr} onClick={onClickDelete} />
        </div>
        <Button text="Очистить" disabled={!arr} onClick={onClickClear} />
      </div>
      <div className={styles.elements}>
        {stack.get().map((item, index) => {
          return (
            <Circle
              letter={item}
              key={index}
              head={index === arr.length - 1 ? "top" : ""}
              state={
                arr.length === index
                  ? status
                  : ElementStates.Changing && index === arr.length - 1
                  ? status
                  : ElementStates.Default
              }
              index={index}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
