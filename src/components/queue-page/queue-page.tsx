import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Queue } from "./queueClass";

export const QueuePage: React.FC = () => {
  const size = 7;
  const queue = useMemo(() => {
    return new Queue<string>(size);
  }, []);

  const [current, setCurrent] = useState<number>(-1);
  const [arr, setArr] = useState(queue.getElements());
  const [isLoading, setIsLoading] = useState<any>({
    isAdd: false,
    isRemove: false,
    isClear: false,
    disabled: false,
  });

  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onEnqueue = async () => {
    setIsLoading({
      ...isLoading,
      isAdd: true,
      disabled: true,
    });
    queue.enqueue(inputValue);
    setInputValue("");
    setArr([...queue.getElements()]);
    setCurrent(queue.getTail() % queue.getSize());
    await delay(500);
    setCurrent(-1);
    await delay(500);
    setIsLoading({
      ...isLoading,
      isAdd: false,
      disabled: false,
    });
  };

  const onDequeue = async () => {
    setIsLoading({
      ...isLoading,
      isRemove: true,
      disabled: true,
    });
    if (queue) {
      queue.dequeue();
      setArr([...queue.getElements()]);
      setCurrent(queue.getHead() & queue.getSize());
      await delay(500);
      setCurrent(-1);
      await delay(500);
    }
    setIsLoading({
      ...isLoading,
      isRemove: false,
      disabled: false,
    });
  };

  const onClear = () => {
    setIsLoading({
      ...isLoading,
      isClear: true,
      disabled: true,
    });
    queue.clear();
    setArr(queue.getElements());
    setIsLoading({
      ...isLoading,
      isClear: false,
      disabled: false,
    });
  };

  useEffect(() => {
    function handleEnterKeydown(evt: KeyboardEvent) {
      if (evt.key === "Enter" && inputValue.length > 0) {
        onEnqueue();
      }
    }
    document.addEventListener("keydown", handleEnterKeydown);
    return () => {
      document.removeEventListener("keydown", handleEnterKeydown);
    };
  }, [inputValue]);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input
            onChange={handleChangeInput}
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            disabled={isLoading.disabled}
          />
          <Button
            text="Добавить"
            isLoader={isLoading.isAdd}
            onClick={onEnqueue}
            disabled={
              !inputValue || queue.getTail() === size || isLoading.disabled
            }
          />
          <Button
            text="Удалить"
            onClick={onDequeue}
            disabled={queue.isEmpty() || isLoading.disabled}
            isLoader={isLoading.isRemove}
          />
        </div>
        <Button
          text="Очистить"
          isLoader={isLoading.isClear}
          onClick={onClear}
          disabled={
            (queue.getHead() === 0 && queue.getTail() === 0) ||
            isLoading.disabled
          }
        />
      </form>
      <div className={styles.elements}>
        {arr.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
              tail={
                index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""
              }
              state={
                index === current
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
