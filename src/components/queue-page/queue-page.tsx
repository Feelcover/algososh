import React, { FormEvent, MouseEvent, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
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
  const { inputValue, handleChangeInput, setInputValue } = useForm("");
  const [current, setCurrent] = useState<number>(-1);
  const [arr, setArr] = useState(queue.getElements());
  const [isLoading, setIsLoading] = useState({
    isAdd: false,
    isRemove: false,
    isClear: false,
    disabled: false,
  });

  const onEnqueue = async (
    evt: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    if (
      !queue.getFull() &&
      inputValue.length > 0 &&
      queue.getTail() !== size &&
      !isLoading.disabled
    ) {
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
    }
  };

  const onDequeue = async () => {
    const checkLast = queue.getElements()
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
    if (checkLast[5] == undefined && checkLast[6] !== undefined) {
      onClear()
    }
    setIsLoading({
      ...isLoading,
      isRemove: false,
      disabled: false,
    });
  };

  const onClear = async () => {
    setIsLoading({
      ...isLoading,
      isClear: true,
      disabled: true,
    });
    await delay(500);
    queue.clear();
    setArr(queue.getElements());
    setIsLoading({
      ...isLoading,
      isClear: false,
      disabled: false,
    });
  };

  return (
    <SolutionLayout title="Очередь">
      <form data-testid="form" className={styles.form} onSubmit={(evt) => onEnqueue(evt)}>
        <div className={styles.container}>
          <Input
            data-testid="input"
            onChange={handleChangeInput}
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            disabled={
              isLoading.disabled ||
              queue.getFull() ||
              queue.getTail() === size
            }
          />
          <Button
            data-testid="add"
            text="Добавить"
            isLoader={isLoading.isAdd}
            onClick={onEnqueue}
            disabled={
              !inputValue ||
              queue.getTail() === size ||
              isLoading.disabled ||
              queue.getFull()
            }
          />
          <Button
            data-testid="remove"
            text="Удалить"
            onClick={onDequeue}
            disabled={queue.isEmpty() || isLoading.disabled}
            isLoader={isLoading.isRemove}
          />
        </div>
        <Button
          data-testid="clear"
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
