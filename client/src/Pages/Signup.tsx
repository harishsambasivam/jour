import { ChangeEvent, useState } from "react";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import Label from "../Components/Label/Label";
import CopyRight from "../Components/CopyRight/CopyRight";
import { Link } from "react-router-dom";

interface UserSignUpForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const initialState: UserSignUpForm = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<UserSignUpForm>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="w-full max-w-xs">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            changeHandler={handleChange}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="*******"
            name="password"
            value={formData.password}
            changeHandler={handleChange}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="*******"
            name="confirmPassword"
            value={formData.confirmPassword}
            changeHandler={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button clickHandler={handleClick}>Sign In</Button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs">
        New to jour, please
        <Link
          className="pl-1 mb-2 inline-block align-baseline underline text-xs text-blue-500 hover:text-blue-800 hover:cursor-pointer"
          to={`/signin`}
        >
          sign in here
        </Link>
      </p>
      <CopyRight />
    </div>
  );
};

export default SignUp;
