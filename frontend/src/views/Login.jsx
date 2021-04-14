import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../css/main.css";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logInStatus, setLogInstatus] = useState("");
  const history = useHistory();
  // const { id } = useParams();

  // const responseGoogle = (response) => {
  //     console.log("Login with Google", response);
  //     history.push("/profile");
  //     // name:response.name
  // }
  // const responseFacebook = (response) => {
  //     console.log("Login with Google", response);
  //     history.push("/profile")
  // }

  const onClickLogin = () => {
    Axios.post("http://localhost:8000/user/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response) {
        history.push(`/profile/:id`);
      } else {
        setLogInstatus("Incorrect");
      }
    });
  };

  // const onClickLogin = async (loginData) => {
  //     try {
  //         console.clear();
  //         console.log('Success received the value of Form:', loginData);
  //         const fetchData = await fetch('http://localhost:8000/user/login', {
  //             method: 'POST',
  //             headers: {
  //                 'content-type': 'application/json'
  //             },
  //             body: JSON.stringify(loginData)
  //         });
  //         if(fetchData) {
  //             const tokenObj = await fetchData.json();
  //             localStorage.setItem('token', tokenObj.token);
  //             history.push("/profile'");
  //         }

  //     } catch (err) {
  //         console.error(err);
  //     }
  // };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6">
          <h2 className="title">Login</h2>
          <form>
            <div className="mb-3">
              <h5 className="error-meassages">{logInStatus}</h5>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />

                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onClickLogin}
                >
                  Login
                </button>
                {/* <button className="btn btn-primary" type="button">Create</button> */}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
