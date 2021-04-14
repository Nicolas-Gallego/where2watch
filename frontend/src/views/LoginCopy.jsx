import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link, useHistory } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../css/FormsInput.css";
import "../css/main.css";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  // password: yup.string().required().min(8),
  // confirmpassword: yup.string().required().min(8),

  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  // const responseGoogle = (response) => {
  //     console.log("Login with Google", response);
  //     history.push("/profile");
  //     // name:response.name
  // }
  // const responseFacebook = (response) => {
  //     console.log("Login with Google", response);
  //     history.push("/profile")
  // }

  const onSubmit = async (loginData) => {
    try {
      console.clear();
      console.log("Success received the value of Form:", loginData);
      const fetchData = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      console.log("MY TOKEN :", fetchData);
      return history.push("/profile/:id'");

      // const tokenObj = await tokenFetch.json();
      // localStorage.setItem('token', tokenObj.token)
      // console.log('FINAL TOKEN :', tokenObj);
      // if (tokenObj) {
      // return history.push("/profile/:id'");
      // }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label">Email</label>
            <input
              {...register("email")}
              className="form-control"
              placeholder="Email"
            />
            <p className="error-meassages">{errors.email?.message}</p>

            <label className="form-label">password</label>
            <input
              {...register("password")}
              className="form-control"
              placeholder="Password"
              type="password"
            />
            <p className="error-meassages">{errors.password?.message}</p>

            <div className="d-grid gap-2">
              <input type="submit" className="btn btn-dark" value="Login" />
            </div>

            <div className="d-grid gap-2">
              <Link to="/signup" className="d-flex justify-content-end">
                Create Account
              </Link>
            </div>

            {/* <div className="row">
                            <div className="col-5">
                                <GoogleLogin
                                    clientId="356289311457-n4v13nj2bj7ck72mfdqs7p8lbk09gu9p.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>

                            <div className="col-">
                                <FacebookLogin
                                    appId="1553215148211473"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    // onClick={componentClicked}
                                    callback={responseFacebook}
                                />
                            </div>
                        </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
