const ErrorText = (props: any) => {
  return (
    <div className="text-red-500 text-xs italic mt-2"> {props.children} </div>
  );
};

export default ErrorText;
