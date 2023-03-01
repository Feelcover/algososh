import React from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css"

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
 <form className={styles.form} >
        <div className={styles.container}>
        <div className={styles.elements}>
          <RadioInput
              label="Выбор"
              name="sorting-type"
              value="select"
              defaultChecked
          />
          <RadioInput
              label="Пузырек"
              name="sorting-type"
              value="bubble"
          />
        </div>
          <Button
              type="button"
              text="По возрастанию"
          />
          <Button
              type="button"
              text="По убыванию"
          />
          <div className={styles.button}>
          <Button
              type="button"
              text="Новый массив"
              minLength={4}
              maxLength={17}
          />
          </div>
        </div>
      </form>
      <ul className={styles.column}>
<Column index={1}/>
      </ul>
    </SolutionLayout>
  );
};
