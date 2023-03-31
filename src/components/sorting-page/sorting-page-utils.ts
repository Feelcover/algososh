import { ElementStates } from "../../types/element-states";

export const randomSortArr = () => {
  const arrLength = Math.floor(Math.random() * 14) + 3;
  let sortArr = [];
  for (let i = 0; i <= arrLength - 1; i++) {
    let randomNumber = Math.floor(Math.random() * 100);
    sortArr.push(randomNumber);
  }
  return sortArr;
};

export const oneElementForSort = [{ number: 18, state: ElementStates.Default }];

export const elementsForSort = [
  { number: 28, state: ElementStates.Default },
  { number: 100, state: ElementStates.Default },
  { number: 10, state: ElementStates.Default }
];
export const sorted = [
    { number: 10, state: ElementStates.Default },
    { number: 28, state: ElementStates.Default },
    { number: 100, state: ElementStates.Default }
  ];