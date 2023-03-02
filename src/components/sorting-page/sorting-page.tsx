import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { TSortArr, TSortLoader } from "../../types/other-types";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swap";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomSortArr } from "./sorting-page-utils";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<TSortArr>>([]);
  const [isLoading, setIsLoading] = useState<TSortLoader>({
    ASC: false,
    DSC: false,
  });

  const [selected, setSelected] = useState<string>("select");
  const handleSelectSort = (evt: ChangeEvent<HTMLInputElement>) => {
    setSelected((evt.target as HTMLInputElement).value);
  };

  const selectSort = async (ascOrDsc: boolean) => {
    setIsLoading({ ASC: ascOrDsc, DSC: !ascOrDsc });
    const sortArr = arr.slice();
    for (let i = 0; i < sortArr.length; i++) {
      let currentId = i;
      sortArr[currentId].state = ElementStates.Changing;
      setArr([...sortArr]);
      for (let j = i + 1; j < sortArr.length; j++) {
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
    setIsLoading({ ASC: false, DSC: false });
  };

  const handleCreateArr = () => {
    const newArr = randomSortArr();
    const sortArr = newArr.map((number) => {
      return {
        number,
        state: ElementStates.Default,
      };
    });
    setArr(sortArr);
  };

  const onClickSort = (ascOrDsc: boolean) => {
    if (selected === "select") {
      selectSort(ascOrDsc);
    }
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
          </div>
          <Button
            type="button"
            text="По возрастанию"
            isLoader={isLoading.ASC}
            onClick={() => onClickSort(true)}
          />
          <Button
            type="button"
            text="По убыванию"
            isLoader={isLoading.DSC}
            onClick={() => onClickSort(false)}
          />
          <div className={styles.button}>
            <Button
              type="button"
              text="Новый массив"
              minLength={4}
              maxLength={17}
              disabled={isLoading.ASC || isLoading.DSC}
              onClick={handleCreateArr}
            />
          </div>
        </div>
      </form>
      <ul className={styles.column}>
        {arr.map((item, index) => {
          return <Column key={index} index={item.number} state={item.state} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
