type ButtonProps = {
  children: string;
  clickHandler: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
