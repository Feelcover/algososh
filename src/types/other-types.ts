import { ElementStates } from "./element-states";

export type TStringArr = {
  value: string;
  color: ElementStates;
};

export type TSortLoader = {
  ASC: boolean;
  DSC: boolean;
};

export type TSortArr = {
  number: number;
  state: ElementStates;
};
