import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import "../css/main.css";
import '../css/login_signup.css'
import { useForm } from "react-hook-form";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const Login = () => {
  const [logInStatus, setLogInstatus] = useState("");
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    fetch(`http://localhost:8000/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        localStorage.setItem("token", response.token);
        if (response.message === "nice") {
          history.push(`/`);
          window.location.reload(true);
        } else {
          alert("Wrong password")
          window.location.reload(true);
          localStorage.clear();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid viewHigh">
      <div className="row d-flex justify-content-center">
        <div className="col-6 col-sm-4 col-lg-3">
          <h2 className="title">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <h5 className="error-meassages">{logInStatus}</h5>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  {...register("username", { required: true })}
                />

                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  {...register("password", { required: true })}
                />
              </div>

                <button
                  className="btn loginButton"
                  type="submit"
                  disabled={!isValid}
                >
                  Login
                </button>
              <div className="">
                <Link to="/signup" className="linkTo d-flex justify-content-end">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
