import { ChangeEvent, useState } from "react";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import Label from "../Components/Label/Label";
import CopyRight from "../Components/CopyRight/CopyRight";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import ErrorText from "../Components/ErrorText/ErrorText";

let userSchema = object({
  username: string()
    .min(3, "must be at least 3 characters long")
    .required("please choose a username"),
  password: string()
    .min(3, "must be at least 3 characters long")
    .required("please choose a password"),
  confirmPassword: string().oneOf(
    [ref("password"), ""],
    "passwords must match"
  ),
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (e: any) => {
  console.log(e);
};

const SignUp = () => {
  return (
    <div className="w-full max-w-xs">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={userSchema}
          validateOnChange={false}
        >
          <Form>
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input placeholder="Username" name="username" />
              <ErrorMessage name="username" component={ErrorText} />
            </div>
            <div className="mb-6">
              <Label htmlFor="password">Password</Label>
              <Input placeholder="*******" name="password" type="password" />
              <ErrorMessage name="password" component={ErrorText} />
            </div>
            <div className="mb-6">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                placeholder="*******"
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage name="confirmPassword" component={ErrorText} />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit">Sign Up</Button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </Form>
        </Formik>
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
