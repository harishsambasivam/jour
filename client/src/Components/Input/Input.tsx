import { Field } from "formik";

type InputProps = {
  placeholder: string;
  name: string;
  as?: string;
  type?: string;
};

const Input = (props: InputProps) => {
  return (
    <Field
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring"
      {...props}
    />
  );
};

export default Input;
