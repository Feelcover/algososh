import { ElementStates } from "./element-states";

export type TStringArr = {
  value: string;
  color: ElementStates;
};

export type TSortArr = {
  number: number;
  state: ElementStates;
};

type TElement = {
	value: string;
	state: ElementStates;
	position: 'add' | 'delete';
}

export type TList = {
	value: string,
	state: ElementStates
	element: TElement | null;
}
