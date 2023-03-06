import React, {
  FormEvent,
  MouseEvent,
  useMemo,
  useState,
} from "react";
import { useForm } from "../../hooks/useForm";
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
  const [isLoading, setIsLoading] = useState({
    isAdd: false,
    isDelete: false,
    isClear: false,
    disabled: false,
  });
  const { inputValue, handleChangeInput, setInputValue } = useForm("");

  const onClickAdd = async (
    evt: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    if (!isLoading.disabled && inputValue.length > 0) {
      setIsLoading({ ...isLoading, isAdd: true, disabled: true });
      stack.push(inputValue);
      setInputValue("");
      await delay(500);
      setStatus(ElementStates.Changing);
      setArr([...stack.get()]);
      await delay(500);
      setStatus(ElementStates.Default);
      setArr([...stack.get()]);
      setIsLoading({ ...isLoading, isAdd: false, disabled: false });
    }
  };

  const onClickDelete = async () => {
    setIsLoading({ ...isLoading, isDelete: true, disabled: true });
    setStatus(ElementStates.Changing);
    setArr([...stack.get()]);
    await delay(500);
    stack.delete();
    setStatus(ElementStates.Default);
    setArr([...stack.get()]);
    setIsLoading({ ...isLoading, isDelete: false, disabled: false });
  };

  const onClickClear = async () => {
    setIsLoading({ ...isLoading, isClear: true, disabled: true });
    await delay(500);
    stack.clear();
    setArr([]);
    setIsLoading({ ...isLoading, isClear: false, disabled: false });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(evt) => onClickAdd(evt)}>
          <Input
            onChange={handleChangeInput}
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            disabled={arr.length > 7}
          />
          <Button
            text="Добавить"
            disabled={!inputValue || isLoading.disabled}
            onClick={onClickAdd}
            isLoader={isLoading.isAdd}
          />
          <Button
            text="Удалить"
            disabled={arr.length < 1 || isLoading.disabled}
            onClick={onClickDelete}
            isLoader={isLoading.isDelete}
          />
        </form>
        <Button
          text="Очистить"
          disabled={arr.length < 1 || isLoading.disabled}
          onClick={onClickClear}
          isLoader={isLoading.isClear}
        />
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
