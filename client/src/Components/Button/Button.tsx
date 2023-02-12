type ButtonProps = {
  children: string;
  clickHandler?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = (props: ButtonProps) => {
  const { type = "button", clickHandler } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type={type}
      onClick={clickHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
