import { ChangeEvent } from "react";

type InputProps = {
  placeholder: string;
  name: string;
  value: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
};

const Input = (props: InputProps) => {
  const { placeholder, name, value, changeHandler, type } = props;
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => changeHandler(e)}
    />
  );
};

export default Input;
