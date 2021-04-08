import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "../css/main.css"

function Signup() {
    const { register, handleSubmit, errors } = useForm();

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState("");

    const onClickCreate = () => {
        console.clear();
        console.log("hello signup");
    }


    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-6">

                    <form>
                        <h1 className="title">Sign Up</h1>
                        <div className="mb-3">
                            <input type="file"
                                placeholder="image"
                                className="form-control"
                            // value={image}
                            // onChange={(event) => setImage(event.target.files[0])}
                            />
                            <label className="form-label">Pseudo</label>
                            <input type="text"
                                className="form-control"
                                placeholder="User name"
                                value={pseudo}
                                onChange={(event) => setPseudo(event.target.value)}
                            />

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

                            <label className="form-label">Confirm Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="confirm password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />

                            <label className="form-label">Age</label>
                            <input type="number"
                                className="form-control"
                                placeholder="Select age..."
                                min="0" max="100"
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                            />

                            <div className="mb-3">
                                <label className="form-label" for="inputGroupSelect01">Platform</label>
                                <select className="form-select" id="inputGroupSelect01">
                                    <option selected>Choose...</option>
                                    <option value="1">netflix</option>
                                    <option value="2">Prime Video</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" 
                                onClick={onClickCreate}>Create Account</button>
                                {/* <button className="btn btn-primary" type="button">Login</button> */}
                            </div>
                            <div className="d-grid gap-2">
                                <Link to="/login" class="d-flex justify-content-end">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
