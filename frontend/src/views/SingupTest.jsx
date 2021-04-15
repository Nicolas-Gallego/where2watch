import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Multiselect } from "multiselect-react-dropdown";
import "../css/FormsInput.css";
import "../css/main.css";


const SingupTest = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [dbErorrs, setDbErrors] = useState("");

  const onSubmit = (data) => {
    if (data.password !== data.confirmpassword) {
      console.log("mdp pas bon");
      return;
    }

    if (data.Platforms) {
      data.Platforms = data.Platforms.map((plat) => {
        return plat.name;
      });
    }

    const formData = new FormData();
    formData.append("profilePicture", data.profilePicture[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmpassword", data.confirmpassword);
    formData.append("age", data.age);
    formData.append("Platforms", data.Platforms);

    fetch("http://localhost:8000/user/signup", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.message === "utilisateur enregister") {
          let path = `/profile/${response.saveUser}`;
          history.push(path);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [platform, setPlatform] = useState([
    { name: "Netflix", id: 1 },
    { name: "Amazon", id: 2 },
    { name: "Disney+", id: 3 },
    { name: "Canal+", id: 4 },
  ]);

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <h2 className="title">Sign Up</h2>
        <div className="col-12 col-md-6">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  placeholder="profilePicture"
                  type="file"
                  name="profilePicture"
                  {...register("profilePicture")}
                />
              </div>
              <label className="form-label">Username</label>
              <input
                {...register("username")}
                className="form-control"
                placeholder="Username"
              />

              <label className="form-label">Email</label>
              <input
                {...register("email", {
                  required: "vous devez enter une addresse mail",
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                className={
                  errors.email ? "form-control is-invalid" : "form-control"
                }
                placeholder="Email"
                type="text"
              />

              <label className="form-label">password</label>
              <input
                {...register("password", {
                  required:
                    "merci d'indiquer un mot de passe minimum 5 caratères",
                  minLength: 5,
                  maxLength: 99,
                })}
                className={
                  errors.password ? "form-control is-invalid" : "form-control"
                }
                placeholder="Password"
                type="password"
              />

              <label className="form-label">Confirm-Password</label>
              <input
                {...register("confirmpassword", {
                  required:
                    "merci d'indiquer un mot de passe minimum 5 caratères",
                  minLength: 5,
                  maxLength: 99,
                })}
                className={
                  errors.confirmpassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Confirmpassword"
                type="password"
              />

              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                {...register("age", { min: 1, max: 99 })}
                className={
                  errors.age ? "form-control is-invalid" : "form-control"
                }
                placeholder="Select age"
              />

              <label className="form-label">Platforms</label>
              <Controller
                control={control}
                name="Platforms"
                render={({ field: { onChange, value } }) => (
                  <Multiselect
                    options={platform}
                    displayValue="name"
                    showCheckbox={true}
                    selectedValues={value}
                    onSelect={onChange}
                    onRemove={onChange}
                  />
                )}
              />

              <div className="d-grid gap-2 mt-4">
                <input
                  type="submit"
                  className="btn btn-dark"
                  value="Signup"
                  disabled={!isValid || isSubmitting}
                />
              </div>

              <div className="d-grid gap-2">
                <Link to="/login" className="d-flex justify-content-end">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingupTest;
