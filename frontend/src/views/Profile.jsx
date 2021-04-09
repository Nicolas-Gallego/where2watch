import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profil = () => {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/profile/:id")
        .then((response) => {return response.json()})
        .then((response) => {
            setUserInfo(response)
        })
    },[])
    
    return (
        <div>
            <h1>Profile Page</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
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
                                        <p>user Name : {userInfo.pseudo}</p>
                                        <p>Age : {userInfo.Age}</p>
                                        <p>Platform : {userInfo.platform}</p>
                                    </div>
                                </>
                            )
                                :
                                <p>Loading...</p>}
                        </div>

                        <div className="col-3 d-flex justify-content-end ">
                            <Link to="/editprofile" className="btn btn-primary">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;
