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

//Тестовые массивы

export const oneElementForSort = [{ number: 18, state: ElementStates.Default }];

export const elementsForSort = [
  { number: 105, state: ElementStates.Default },
  { number: 28, state: ElementStates.Default },
  { number: 31, state: ElementStates.Default },

];

// При больших массивах возникает проблема со временем тестов из за делеев
export const sortedAsc = ["28","31","105"];
export const sortedDsc = ["105", "31","28"];

