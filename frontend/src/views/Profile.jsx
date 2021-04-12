import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/FormsInput.css"

const Profil = () => {
    const { id } = useParams();
    const url = `http://localhost:8000/user/profile/${id}`
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios.get(url)
        .then(response => {
            console.log(response)
            setUserInfo(response.data)
        })
    }, [url]);

    return (
        <div>

            <div className="container-fluid">
                <div className="row d-flex justify-content-center ">
                    <div className="col-10 profile-border">
                        <h1 className="d-flex justify-content-center">Profile Page</h1>
                        <div className="row">
                            {userInfo ? (
                                <>
                                    {/* <div className="col-4">
                                        <img src={}
                                            className="profileImage"
                                            alt={`UserName : ${userInfo.pseudo}`} />
                                    </div> */}
                                    <div className="col-6 ">
                                        <p>{userInfo.image}</p>
                                        <p>Email : {userInfo.email}</p>
                                        <p>user Name : {userInfo.username}</p>
                                        <p>Age : {userInfo.age}</p>
                                        <p>Platform : {userInfo.platforms}</p>
                                    </div>
                                </>
                            )
                                :
                                <p>Loading...</p>}
                        </div>

                        <div className="d-flex justify-content-end ">
                            <Link to="/editprofile" className="btn btn-primary">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;
