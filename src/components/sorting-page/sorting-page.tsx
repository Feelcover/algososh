import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { TSortArr } from "../../types/other-types";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swap";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomSortArr } from "./sorting-page-utils";
import styles from "./sorting-page.module.css";
import { elementsForSort, oneElementForSort } from "./sorting-page-utils";


export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<TSortArr>>([]);
  const [isLoading, setIsLoading] = useState({
    ASC: false,
    DSC: false,
    newArrLoader: false,
    Loader: false,
  });

  const [selected, setSelected] = useState<string>("select");
  const newArr: number[] = randomSortArr();

  const handleSelectSort = (evt: ChangeEvent<HTMLInputElement>) => {
    setSelected((evt.target as HTMLInputElement).value);
  };

  const selectSort = async (ascOrDsc: boolean) => {
    setIsLoading({ ...isLoading, ASC: ascOrDsc, DSC: !ascOrDsc, Loader: true });
    const sortArr = arr.slice();
    const { length } = sortArr;

    for (let i = 0; i < length; i++) {
      let currentId = i;
      sortArr[currentId].state = ElementStates.Changing;
      setArr([...sortArr]);
      for (let j = i + 1; j < length; j++) {
        sortArr[j].state = ElementStates.Changing;
        setArr([...sortArr]);
        await delay(500);
        if (ascOrDsc) {
          if (sortArr[j].number < sortArr[currentId].number) {
            currentId = j;
          }
        } else {
          if (sortArr[j].number > sortArr[currentId].number) {
            currentId = j;
          }
        }
        sortArr[j].state = ElementStates.Default;
        setArr([...sortArr]);
        await delay(500);
      }
      swap(sortArr, i, currentId);
      sortArr[currentId].state = ElementStates.Default;
      sortArr[i].state = ElementStates.Modified;
      setArr([...sortArr]);
      await delay(500);
    }
    setIsLoading({ ...isLoading, ASC: false, DSC: false, Loader: false });
  };

  const bubbleSort = async (ascOrDsc: boolean) => {
    setIsLoading({ ...isLoading, ASC: ascOrDsc, DSC: !ascOrDsc, Loader: true });
    const sortArr = arr.slice();
    const { length } = sortArr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1; j++) {
        sortArr[j].state = ElementStates.Changing;
        sortArr[j + 1].state = ElementStates.Changing;
        setArr([...sortArr]);
        await delay(500);
        if (ascOrDsc) {
          if (sortArr[j].number > sortArr[j + 1].number) {
            swap(sortArr, j, j + 1);
            setArr([...sortArr]);
            await delay(500);
          }
        } else {
          if (sortArr[j].number < sortArr[j + 1].number) {
            swap(sortArr, j, j + 1);
            setArr([...sortArr]);
            await delay(500);
          }
        }
        sortArr[j].state = ElementStates.Default;
        sortArr[j + 1].state = ElementStates.Default;
        setArr([...sortArr]);
      }
      sortArr[length - i - 1].state = ElementStates.Modified;
      setArr([...sortArr]);
      await delay(500);
    }
    setIsLoading({ ...isLoading, ASC: false, DSC: false, Loader: false });
  };

  const handleCreateArr = async () => {
    setIsLoading({ ...isLoading, newArrLoader: true });
    await delay(500);
    const sortArr = newArr.map((number) => {
      return {
        number,
        state: ElementStates.Default,
      };
    });
    setArr(sortArr);
    setIsLoading({ ...isLoading, newArrLoader: false });
  };

  //Для теста при пустом массиве
  const testEmptyArr = () => {
    setArr([]);
  };
  //Для теста c одним элементом в массиве
  const testOneElementArr = () => {
    testEmptyArr();
    setArr(oneElementForSort);
  };

  //Для теста c несколькими элементами в массиве
  const testElementsArr = () => {
    testEmptyArr();
    setArr(elementsForSort);
  };

  const onClickSort = (ascOrDsc: boolean) => {
    selected === "select" ? selectSort(ascOrDsc) : bubbleSort(ascOrDsc);
  };

  useEffect(() => {
    handleCreateArr();
  }, []);
  
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.elements}>
            <RadioInput
              onChange={handleSelectSort}
              label="Выбор"
              name="sorting-type"
              value="select"
              defaultChecked
            />
            <RadioInput label="Пузырёк" name="sorting-type" value="bubble" />
            <div
              className={styles.testButton}
              data-testid="testEmptyArr"
              onClick={testEmptyArr}
            />
            <div
              className={styles.testButton}
              data-testid="testOneElementArr"
              onClick={testOneElementArr}
            />
            <div
              className={styles.testButton}
              data-testid="testElementsArr"
              onClick={testElementsArr}
            />
          </div>

          <Button
            data-testid="testASC"
            type="button"
            text="По возрастанию"
            isLoader={isLoading.ASC}
            disabled={isLoading.Loader || arr.length <= 0}
            onClick={() => onClickSort(true)}
          />
          <Button
            data-testid="testDSC"
            type="button"
            text="По убыванию"
            isLoader={isLoading.DSC}
            disabled={isLoading.Loader || arr.length <= 0}
            onClick={() => onClickSort(false)}
          />
          <div className={styles.button}>
            <Button
              data-testid="testNewArr"
              type="button"
              text="Новый массив"
              minLength={4}
              maxLength={17}
              disabled={false}
              onClick={handleCreateArr}
              isLoader={isLoading.newArrLoader}
            />
          </div>
        </div>
      </form>
      <ul className={styles.column}>
        {arr.map((item, index) => {
          return (
            <Column
              key={index}
              index={item.number}
              state={item.state}
              data-testid={"testColumn"}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
