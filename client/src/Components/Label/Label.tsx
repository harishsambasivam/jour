type LabelProps = {
  htmlFor: string;
  children: string;
};

const Label = (props: LabelProps) => {
  const { htmlFor, children } = props;
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
