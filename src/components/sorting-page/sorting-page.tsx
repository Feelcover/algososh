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

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<TSortArr>>([]);
  const [isLoading, setIsLoading] = useState({
    ASC: false,
    DSC: false,
    newArr:false,
    Loader: false,
  });

  const [selected, setSelected] = useState<string>("select");
  const handleSelectSort = (evt: ChangeEvent<HTMLInputElement>) => {
    setSelected((evt.target as HTMLInputElement).value);
  };

  const selectSort = async (ascOrDsc: boolean) => {
    setIsLoading({...isLoading, ASC: ascOrDsc, DSC: !ascOrDsc, Loader: true });
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
    setIsLoading({...isLoading, ASC: false, DSC: false, Loader: false });
  };

  const bubbleSort = async (ascOrDsc: boolean) => {
    setIsLoading({...isLoading, ASC: ascOrDsc, DSC: !ascOrDsc, Loader: true });
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
    setIsLoading({...isLoading, ASC: false, DSC: false, Loader: false });
  };

  const handleCreateArr = async() => {
    setIsLoading({ ...isLoading, newArr: true });
    await delay(500)
    const newArr = randomSortArr();
    const sortArr = newArr.map((number) => {
      return {
        number,
        state: ElementStates.Default,
      };
    });
    setArr(sortArr);
    setIsLoading({ ...isLoading, newArr: false });

  };

  const onClickSort = (ascOrDsc: boolean) => {
    selected === "select" ? selectSort(ascOrDsc) : bubbleSort(ascOrDsc);
  };

  useEffect(() => {
    handleCreateArr();
  }, []);

  return (
    <SolutionLayout title="???????????????????? ??????????????">
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.elements}>
            <RadioInput
              onChange={handleSelectSort}
              label="??????????"
              name="sorting-type"
              value="select"
              defaultChecked
            />
            <RadioInput label="??????????????" name="sorting-type" value="bubble" />
          </div>
          <Button
            type="button"
            text="???? ??????????????????????"
            isLoader={isLoading.ASC}
            disabled={isLoading.Loader}
            onClick={() => onClickSort(true)}
          />
          <Button
            type="button"
            text="???? ????????????????"
            isLoader={isLoading.DSC}
            disabled={isLoading.Loader}
            onClick={() => onClickSort(false)}
          />
          <div className={styles.button}>
            <Button
              type="button"
              text="?????????? ????????????"
              minLength={4}
              maxLength={17}
              disabled={isLoading.Loader}
              onClick={handleCreateArr}
              isLoader={isLoading.newArr}
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
