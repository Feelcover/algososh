import React from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.upForm}>
          <Input
          extraClass={styles.input}
            placeholder="Введите значение"
            // onChange={}
            // value={}
            maxLength={4}
            isLimitText={true}
          />
          <Button
            text="Добавить в head"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
          <Button
            text="Добавить в tail"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
          <Button
            text="Удалить из head"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
          <Button
            text="Удалить из tail"
            type="button"
            // onClick={}
            // disabled={}
            // isLoader={}
          />
        </div>
        <form className={styles.downForm}>
          <Input
            min={0}
            // max={}
            type="number"
            placeholder="Введите индекс"
            // value={}
            // onChange={}
          />
          <Button
            text="Добавить по индексу"
            type="button"
            // onClick={}
            // isLoader={}
            // disabled={}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            // onClick={}
            // isLoader={}
            // disabled={}
          />
        </form>
        <ul className={styles.elements}>
          <li className={styles.element}>
            <Circle extraClass={styles.upElement} isSmall={true} state={ElementStates.Changing}/>
            <Circle head={"head"} />
            <ArrowIcon />
          </li>
          <li className={styles.element}>
            <Circle />
            <ArrowIcon />
          </li>
          <li className={styles.element}>
            <Circle tail={"tail"} />
            <ArrowIcon />
            <Circle extraClass={styles.downElement} isSmall={true}/>
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
