import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "../css/FormsInput.css"
import "../css/main.css"

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmpassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),

    age: yup.number().positive().integer().required(),

    // platform: yup.string().required(),
    platform: yup
    .array()
    .of(
        yup.object({
            yes: yup
                .string()
                .default('Yes')
        }),
        yup.object({
            no: yup
                .string()
                .default('No')
        })
    )
    .required('Please select the platform'),
});

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const history = useHistory();
    const [platform, setPlatform] = useState([
        // "Netflix", "Amazon Prime", "Other"
        { name: "Netflix", id: 1 },
        { name: "Amazon", id: 2 },
        { name: "Disney+", id: 3 },
        { name: "Canal+", id: 4 }
    ]);
    const [selectedPlatform, setSelectedPlatform] = useState([]);

    async function onSubmit(data) {
        console.log(data)
        console.log("user created", data);

        let result = await fetch('http://localhost:8000/user/signup', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        })
        result = await result.json()
        console.warn("Result", result);
        if (result.ok) {
            const tokenObj = await result.json();
            localStorage.setItem('token', tokenObj.token);
            history.push('/profile/:id');
        }

    };

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="form-label">Username</label>
                        <input {...register("username")}
                            className="form-control"
                            placeholder="Username" />
                        <p className="error-meassages">{errors.username?.message}</p>

                        <label className="form-label">Email</label>
                        <input {...register("email")}
                            className="form-control"
                            placeholder="Email" />
                        <p className="error-meassages">{errors.email?.message}</p>

                        <label className="form-label">password</label>
                        <input {...register("password")}
                            className="form-control"
                            placeholder="Password"
                            type="password" 
                            />
                        <p className="error-meassages">{errors.password?.message}</p>

                        <label className="form-label">Confirm-Password</label>
                        <input {...register("confirmpassword")}
                            className="form-control"
                            placeholder="Confirmpassword"
                            type="password" 
                            />
                        <p className="error-meassages">{errors.confirmpassword?.message}</p>

                        <label className="form-label">Age</label>
                        <input {...register("age")}
                            className="form-control"
                            placeholder="Select age" />
                        <p className="error-meassages">{errors.age?.message}</p>


                        <label className="form-label">Platforms</label>
                        <Multiselect
                            options={platform}
                            displayValue="name"
                            showCheckbox={true}
                            selectedValues={selectedPlatform}
                            onSelect={(list) => setSelectedPlatform(list)}
                            onRemove={(list) => setSelectedPlatform(list)}
                        />
                        
                        <div className="d-grid gap-2">
                            <input type="submit" className="btn btn-primary" />
                        </div>

                        <div className="d-grid gap-2">
                            <Link to="/login" class="d-flex justify-content-end">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div >

    );
}
