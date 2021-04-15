import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import "../css/FormsInput.css";
import "../css/main.css";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  // const [platform, setPlatform] = useState("");
  const [platform, setPlatform] = useState([
    // "Netflix", "Amazon Prime", "Other"
    { name: "Netflix", id: 1 },
    { name: "Amazon", id: 2 },
    { name: "Disney+", id: 3 },
    { name: "Canal+", id: 4 },
  ]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);

  async function onClickCreate() {
    // let data = {
    //   username,
    //   email,
    //   password,
    //   age,
    //   platforms: selectedPlatform.map((platform) => {
    //     return platform.name;
    //   }),
    // };
    // console.log("user created", data);

    // let result = await fetch("http://localhost:8000/user/signup", {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // result = await result.json();
    // console.warn("Result", result);
    // if (result.ok) {
    //   const tokenObj = await result.json();
    //   localStorage.setItem("token", tokenObj.token);
    //   history.push("/profile/:id");
    // }
  }

  // const onClickCreate = (event) => {
  //     console.clear();
  //     console.log("hello signup", event);
  // try {
  //     console.clear();
  //     console.log('Success received the value of Form:', value)
  //         const result = await fetch('http://localhost:8000/user/signup', {
  //             method: 'POST',
  //             headers: {
  //                 'content-type': 'application/json'
  //             },
  //             body: JSON.stringify(value)
  //         });
  //         console.log('MY Result:', result);
  //         const results = await result.json()
  //         localStorage.setItem('LocalStorage', JSON.stringify(results))
  //         console.log('FINAL Results :', results);
  //         history.push("/home")
  // } catch (err) {
  //     console.error(err)
  // }
  // }

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6">
          <form>
            <h2 className="title">Sign Up</h2>
            <div className="mb-3">
              <input
                type="file"
                placeholder="image"
                className="form-control"
                // value={image}
                // onChange={(event) => setImage(event.target.files[0])}
              />
              <label className="form-label">Pseudo</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Select age..."
                min="0"
                max="100"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
              <div className="mb-3">
                <label className="form-label" for="inputGroupSelect01">
                  Platform
                </label>
                <Multiselect
                  options={platform}
                  displayValue="name"
                  showCheckbox={true}
                  selectedValues={selectedPlatform}
                  onSelect={(list) => setSelectedPlatform(list)}
                  onRemove={(list) => setSelectedPlatform(list)}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onClickCreate}
                >
                  Create Account
                </button>
                {/* <button className="btn btn-primary" type="button">Login</button> */}
              </div>
              <div className="d-grid gap-2">
                <Link to="/login" className="d-flex justify-content-end">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
