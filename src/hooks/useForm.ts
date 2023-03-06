import { ChangeEvent, useState } from "react";


export function useForm(inputValues:string) {
    const [inputValue, setInputValue] = useState(inputValues);
  
    const handleChangeInput = (evt:ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value);
    };
    return {inputValue, handleChangeInput, setInputValue};
  }


  export function useFormIndex(index:number) {
    const [inputIndex, setInputIndex] = useState(index);
  
    const handleChangeInputIndex = (evt:ChangeEvent<HTMLInputElement>) => {
        setInputIndex(Number(evt.target.value));
    };
    return {inputIndex, handleChangeInputIndex, setInputIndex};
  }

  