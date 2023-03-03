import React, { ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"

export const QueuePage: React.FC = () => {
  const [arr, setArr] = useState([]);
  const [queue, setQueue] = useState();
  const [status, setStatus] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };


  return (
    <SolutionLayout title="Очередь">
              <form className={styles.form}>
          <div className={styles.container}>
            <Input
                onChange={handleChangeInput}
                value={inputValue}
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
