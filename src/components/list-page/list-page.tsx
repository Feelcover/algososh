import React, { useState } from "react";
import { useForm, useFormIndex } from "../../hooks/useForm";
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
const maxLength = 4;
const maxIndex = 7;

export const ListPage: React.FC = () => {
  const listArr: TList[] = initialArray.map((item) => ({
    value: item,
    state: ElementStates.Default,
    element: null,
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

  const { inputValue, handleChangeInput, setInputValue } = useForm("");
  const { inputIndex, handleChangeInputIndex, setInputIndex } = useFormIndex(0);

  const onAddToHead = async () => {
    setIsLoading({ ...isLoading, addToHead: true, disabled: true });
    list.addToHead(inputValue);
    if (arr.length > 0) {
      arr[0].element = {
        value: inputValue,
        state: ElementStates.Changing,
        position: "add",
      };
    }
    setArr([...arr]);
    await delay(500);
    arr[0].element = null;
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
      element: {
        value: inputValue,
        state: ElementStates.Changing,
        position: "add",
      },
    };
    setArr([...arr]);
    await delay(500);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      element: null,
    };

    arr.push({
      value: inputValue,
      state: ElementStates.Modified,
      element: null,
    });
    setArr([...arr]);
    await delay(500);
    arr[arr.length - 1].state = ElementStates.Default;
    setArr([...arr]);
    setIsLoading({ ...isLoading, addToTail: false, disabled: false });
  };

  const onDeleteInHead = async () => {
    setIsLoading({ ...isLoading, deleteInHead: true, disabled: true });
    arr[0] = {
      ...arr[0],
      value: "",
      element: {
        value: arr[0].value,
        state: ElementStates.Changing,
        position: "delete",
      },
    };
    list.deleteInHead();
    setArr([...arr]);
    await delay(500);
    arr.shift();
    setArr([...arr]);
    setIsLoading({ ...isLoading, deleteInHead: false, disabled: false });
  };

  const onDeleteInTail = async () => {
    setIsLoading({ ...isLoading, deleteInTail: true, disabled: true });
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      value: "",
      element: {
        value: arr[arr.length - 1].value,
        state: ElementStates.Changing,
        position: "delete",
      },
    };
    list.deleteInTail();
    setArr([...arr]);
    await delay(500);
    arr.pop();
    setArr([...arr]);
    setIsLoading({ ...isLoading, deleteInTail: false, disabled: false });
  };

  const onDeleteByIndex = async () => {
    setIsLoading({ ...isLoading, deleteByIndex: true, disabled: true });
    list.deleteByIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      arr[i] = {
        ...arr[i],
        state: ElementStates.Changing,
      };
      await delay(500);
      setArr([...arr]);
    }
    arr[inputIndex] = {
      ...arr[inputIndex],
      value: "",
      element: {
        value: arr[inputIndex].value,
        state: ElementStates.Changing,
        position: "delete",
      },
    };
    await delay(500);
    setArr([...arr]);
    arr.splice(inputIndex, 1);
    arr[inputIndex - 1] = {
      ...arr[inputIndex - 1],
      value: arr[inputIndex - 1].value,
      state: ElementStates.Modified,
      element: null,
    };
    await delay(500);
    setArr([...arr]);
    arr.forEach((elem) => {
      elem.state = ElementStates.Default;
    });
    await delay(500);
    setArr([...arr]);
    setInputIndex(1);
    setIsLoading({ ...isLoading, deleteByIndex: false, disabled: false });
  };

  const OnAddByIndex = async () => {
    setIsLoading({ ...isLoading, addByIndex: true, disabled: true });
    list.addByIndex(inputValue, inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      arr[i] = {
        ...arr[i],
        state: ElementStates.Changing,
        element: {
          value: inputValue,
          state: ElementStates.Changing,
          position: "add",
        },
      };
      await delay(500);
      setArr([...arr]);
      if (i > 0) {
        arr[i - 1] = {
          ...arr[i - 1],
          element: null,
        };
      }
      setArr([...arr]);
    }
    await delay(500);
    arr[inputIndex] = {
      ...arr[inputIndex],
      state: ElementStates.Default,
      element: null,
    };
    arr.splice(inputIndex, 0, {
      value: inputValue,
      state: ElementStates.Modified,
      element: null,
    });
    setArr([...arr]);
    arr[inputIndex].state = ElementStates.Default;
    arr.forEach((el: TList) => {
      el.state = ElementStates.Default;
    });
    await delay(500);
    setArr([...arr]);
    setInputValue("");
    setInputIndex(1);
    setIsLoading({ ...isLoading, addByIndex: false, disabled: false });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form
          data-testid="form"
          className={styles.upForm}
          onSubmit={(evt) => evt.preventDefault()}
        >
          <Input
            data-testid="input"
            onChange={handleChangeInput}
            extraClass={styles.input}
            placeholder="Введите значение"
            value={inputValue}
            maxLength={maxLength}
            isLimitText={true}
            disabled={isLoading.disabled}
          />
          <Button
            data-testid="add_head"
            onClick={onAddToHead}
            text="Добавить в head"
            type="button"
            disabled={
              isLoading.disabled || !inputValue || arr.length >= maxIndex
            }
            isLoader={isLoading.addToHead}
          />
          <Button
            data-testid="add_tail"
            onClick={onAddToTail}
            text="Добавить в tail"
            type="button"
            disabled={
              isLoading.disabled || !inputValue || arr.length >= maxIndex
            }
            isLoader={isLoading.addToTail}
          />
          <Button
            data-testid="delete_head"
            onClick={onDeleteInHead}
            text="Удалить из head"
            type="button"
            isLoader={isLoading.deleteInHead}
            disabled={
              isLoading.disabled || arr.length <= 1 || isLoading.deleteInHead
            }
          />
          <Button
            data-testid="delete_tail"
            onClick={onDeleteInTail}
            text="Удалить из tail"
            type="button"
            disabled={
              isLoading.deleteInTail || arr.length <= 1 || isLoading.disabled
            }
            isLoader={isLoading.deleteInTail}
          />
        </form>

        <form
          data-testid="form_index"
          className={styles.downForm}
          onSubmit={(evt) => evt.preventDefault()}
        >
          <Input
            data-testid="input_index"
            onChange={handleChangeInputIndex}
            placeholder="Введите индекс"
            min={0}
            max={maxIndex}
            type="number"
            value={inputIndex}
            disabled={isLoading.disabled}
          />
          <Button
            data-testid="add_index"
            onClick={OnAddByIndex}
            text="Добавить по индексу"
            type="button"
            isLoader={isLoading.addByIndex}
            disabled={
              isLoading.disabled ||
              !inputIndex ||
              !inputValue ||
              inputIndex > arr.length - 1 ||
              arr.length >= maxIndex
            }
          />
          <Button
            data-testid="delete_index"
            onClick={onDeleteByIndex}
            text="Удалить по индексу"
            type="button"
            isLoader={isLoading.deleteByIndex}
            disabled={
              isLoading.disabled ||
              arr.length === 0 ||
              inputIndex > arr.length - 1 ||
              inputIndex < 1
            }
          />
        </form>
        <ul className={styles.elements}>
          {arr.map((item, index) => {
            return (
              <li className={styles.element} key={index}>
                {item.element && (
                  <Circle
                    isSmall={true}
                    extraClass={`${styles.smallElement} ${
                      styles[`${item.element.position}`]
                    }`}
                    letter={item.element.value}
                    state={item.element.state}
                  />
                )}
                <Circle
                  letter={item.value}
                  index={index}
                  head={index === 0 && !item.element ? "head" : ""}
                  tail={index === arr.length - 1 && !item.element ? "tail" : ""}
                  isSmall={false}
                  state={item.state}
                />
                {index < arr.length - 1 && (
                  <ArrowIcon
                    fill={
                      item.state !== ElementStates.Changing
                        ? "#0032FF"
                        : "#d252e1"
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
