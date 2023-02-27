import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string-page.module.css";

const array = ["H", "E", "L", "L", "O"];

export const StringPage: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form}>
          <Input maxLength={11} extraClass={styles.input} isLimitText={true} />
          <Button text="Развернуть" extraClass={styles.button} />
        </form>
        <ul className={styles.element}>
          {array.map((item) => {
            return <Circle />;
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
