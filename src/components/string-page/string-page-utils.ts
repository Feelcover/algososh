import { TStringArr } from "../../types/other-types";

export const swap = (arr: TStringArr[], i: number, j: number): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};