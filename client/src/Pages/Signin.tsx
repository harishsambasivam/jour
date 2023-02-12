import { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import CopyRight from "../components/CopyRight/CopyRight";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
import { object, string } from "yup";
import ErrorText from "../components/ErrorText/ErrorText";
import axios from "axios";
import { getEnv } from "../config/env";
import { logger } from "../utils/logger";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AuthContext from "../context/AuthContext";

let userSchema = object({
  username: string()
    .min(3, "must be at least 3 characters long")
    .required("please choose a username"),
  password: string()
    .min(3, "must be at least 3 characters long")
    .required("please choose a password"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (userData: any) => {
    const res = await axios.post(`${getEnv("serverUri")}/auth/login`, userData);
    logger.info(res);
    const { data: body } = res;
    if (body.status === "success") {
      setAccessToken(body.data.accessToken);
      setRefreshToken(body.data.refreshToken);
      setAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={userSchema}
        validateOnChange={false}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <div className="flex items-center justify-between">
            <Button type="submit">Sign In</Button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </Form>
      </Formik>

      <p className="text-center text-gray-500 text-xs">
        Already a jour user, please
        <Link
          className="pl-1 mb-2 inline-block align-baseline underline text-xs text-blue-500 hover:text-blue-800 hover:cursor-pointer"
          to={`/signup`}
        >
          sign up here
        </Link>
      </p>
      <CopyRight />
    </div>
  );
};

export default SignIn;
