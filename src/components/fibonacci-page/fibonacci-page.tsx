import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css"

export const FibonacciPage: React.FC = () => {

  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
            maxLength={19}
            type="number"
            placeholder="Введите число"
            isLimitText={true}
        />
        <Button
            text="Рассчитать"

        />
      </form>
      <div className={styles.elements}>
        <Circle/>
      </div>
    </SolutionLayout>
  );
};
