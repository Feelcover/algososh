import { ElementStates } from "./element-states";

export type TStringArr = {
  value: string;
  color: ElementStates;
};

export type TSortLoader = {
  ASC: boolean;
  DSC: boolean;
  Loader:boolean;
};

export type TSortArr = {
  number: number;
  state: ElementStates;
};

export type TList = {
  state: ElementStates,
  el: number | string,
  add?: boolean;
  delete?: boolean;
  smallCircle?: {
      el?: string | null;
  };
}
