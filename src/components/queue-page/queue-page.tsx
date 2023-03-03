import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
              <form className={styles.form}>
          <div className={styles.container}>
            <Input
                // onChange={}
                // value={}
                maxLength={4}
                isLimitText={true}
            />
            <Button
                text="Добавить"
                // onClick={}
                // disabled={}
            />
            <Button
                text="Удалить"
                // onClick={}
                // disabled={}
            />
          </div>
          <Button
              text="Очистить"
             // onClick={}
                // disabled={}
          />
        </form>
        <div className={styles.elements}>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>

        </div>
    </SolutionLayout>
  );
};
