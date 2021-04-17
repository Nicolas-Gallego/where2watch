import "../css/profile.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/FormsInput.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ProfilePage = () => {
  const { id } = useParams();
  const url = `http://localhost:8000/user/profile/${id}`;
  const [userInfo, setUserInfo] = useState([]);
  const [myToken, setMyToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetch(`http://localhost:8000/user/profile/${id}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${myToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setUserInfo(response.userProfil);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          {userInfo ? (
            <>
              <div className="col-12 d-flex justify-content-center p-5 image">
                <img
                  src={`http://localhost:8000/${userInfo.profilePicture}`}
                  className="profileImage img-fluid"
                  alt={`UserName : ${userInfo.username}`}
                />
              </div>
              <div className="col-6 profileSquare">
                <div className="col-6">
                  <span>
                    <h6>Email:</h6>
                    {userInfo.email}
                  </span>
                  <span>
                    <h6>Username:</h6>
                    {userInfo.username}
                  </span>
                  <span>
                    <h6>Age:</h6>
                    {userInfo.age}
                  </span>
                  <span>
                    <h6>Platform:</h6>
                    {userInfo.platforms}
                  </span>
                </div>
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
    </>
  );
};
export default ProfilePage;
