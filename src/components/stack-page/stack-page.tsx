import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"

export const StackPage: React.FC = () => {
  const [arr, setArr] = useState<string[]>([])
  const [status, setStatus] = useState<ElementStates>(ElementStates.Changing)

  const [inputValue, setInputValue] = useState<string>("");
  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

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
          <Button
              text='Добавить'
              disabled={!inputValue}
              // onClick={}
               />
          <Button
              text='Удалить'
              disabled={!arr}
              // onClick={}
               />
        </div>
        <Button
            text='Очистить'
            disabled={!arr}
            // onClick={}
             />
      </div>
      <div className={styles.elements}>
        <Circle/>
        <Circle/>

      </div>
    </SolutionLayout>
  );
};
