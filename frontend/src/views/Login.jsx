import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { useHistory  } from 'react-router-dom';
import "../css/main.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const responseGoogle = (response) => {
        console.log("Login with Google", response);
        history.push("/profile")
    }

    const onClickLogin = async (event) => {

        try {
            console.clear();
            console.log('Success received the value from Form:', event)
            // const result = await fetch('http://localhost:8000/login', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(event)
            // });
            // console.log('MY Result:', result);
            // const results = await result.json()
            // localStorage.setItem('user-info', JSON.stringify(results))
            // console.log('FINAL Results :', results);
            // history.push("/profile")
        } catch (err) {
            console.error(err)
        }
    };

return (
    <div className="container-fluid">
        <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-6">


                <h1 className="title">Login Up</h1>
                <form>
                    <div className="mb-3">
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" onClick={onClickLogin}>Login</button>
                            {/* <button className="btn btn-primary" type="button">Create</button> */}
                        </div>
                        <div className="d-grid gap-2">
                            <Link to="/signup" class="d-flex justify-content-end">Create Account</Link>
                        </div>

                        <div>
                            <GoogleLogin
                                clientId="356289311457-n4v13nj2bj7ck72mfdqs7p8lbk09gu9p.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />


                        </div>
                    </div>

                </form>
            </div>

        </div>
    </div>
)
}

export default Login;
