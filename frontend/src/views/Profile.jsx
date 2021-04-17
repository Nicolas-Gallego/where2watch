import "../css/profile.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/FormsInput.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Profil = () => {
  const { id } = useParams();
  const url = `http://localhost:8000/user/profile/${id}`;
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/user/profile/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setUserInfo(response.userProfil);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.get(url).then((response) => {
    //   console.log(response);
    //   console.log(
    //     `http://localhost:8000/${response.data.userProfil.profilePicture}`
    //   );
    //   setUserInfo(response.data.userProfil);
    // });
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-10 profile-border">
            <h1 className="d-flex justify-content-center">Profile Page</h1>
            <div className="row">
              <div className="d-flex justify-content-between">
                {userInfo ? (
                  <>
                    <div className="col-4">
                      <img
                        src={`http://localhost:8000/${userInfo.profilePicture}`}
                        className="profileImage"
                        alt={`UserName : ${userInfo.pseudo}`}
                      />
                    </div>
                    <div className="col-6 ">
                      <span>
                        <h6>Email :</h6>
                        {userInfo.email}
                      </span>
                      <span>
                        <h6>Username :</h6>
                        {userInfo.username}
                      </span>
                      <span>
                        <h6>Age :</h6>
                        {userInfo.age}
                      </span>
                      <span>
                        <h6>Platform :</h6>
                        {userInfo.platforms}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className=" d-flex justify-content-center loader">
                    <Loader
                      type="Circles"
                      color="#F0F8FF"
                      height={100}
                      width={100}
                      timeout={10000}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
