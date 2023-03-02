import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<any>([])

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <SolutionLayout title="Стек">
 <div className={styles.container}>
        <div className={styles.form}>
          <Input
              // onChange={}
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
              disabled={!stackArr}
              // onClick={}
               />
        </div>
        <Button
            text='Очистить'
            disabled={!stackArr}
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
