import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Multiselect } from "multiselect-react-dropdown";

import "../css/FormsInput.css";
import "../css/main.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Signup() {
  const schema = yup.object().shape({
    picture: yup
      .mixed()
      .required("Upload Profile Photo")
      .test("fileSize", "The file is to Large", (value) => {
        return value && value[0].size <= 2000000; //less than 2 MB
      })
      .test("types", "We only support jpeg", (value) => {
        return value && value[0].type === "image/png";
      }),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),

    age: yup.number().positive().integer(),

    platform: yup.array(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const [platform, setPlatform] = useState([
    { name: "Netflix", id: 1 },
    { name: "Amazon", id: 2 },
    { name: "Disney+", id: 3 },
    { name: "Canal+", id: 4 },
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState([]);

  const submitForm = (data) => {
    console.log(data);
    try {
      // Should format date value before submit.
      data.profilePicture = data.profilePicture.file.response.imageUrl;
      delete data.confirm_password;
      console.log("Received values of form: ", data);
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const tokenObj = await response.json();
        localStorage.setItem("token", tokenObj.token);
        history.push("/profile/:id");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // async function onSubmit(data) {
  //     console.log(data)
  //     console.log("user created", data);

  //     let result = await fetch('http://localhost:8000/user/signup', {
  //         method: "POST",
  //         mode: 'cors',
  //         body: JSON.stringify(data),
  //         headers: {
  //             "Content-type": "application/json"
  //         },
  //     })
  //     result = await result.json()
  //     console.warn("Result", result);
  //     if (result.ok) {
  //         const tokenObj = await result.json();
  //         localStorage.setItem('token', tokenObj.token);
  //         history.push('/profile/:id');
  //     }

  // };

  return (
    
  );
}
