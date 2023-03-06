import { TSortArr, TStringArr} from "../types/other-types";

export const swap = (arr: Array<TStringArr> | Array<TSortArr>, i: number, j: number): void => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };