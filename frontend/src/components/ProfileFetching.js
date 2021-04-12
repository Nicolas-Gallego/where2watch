import React, { useState, useEffect } from 'react';
import axios from "axios";

function ProfileFetching(){
    const[users, setUsers] = useState([]);

    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/posts`)
        fetch (`http://localhost:8000/profile/${id}`)
        .then(response => response.json())
        .then(result => {
          console.log("user :", result);
        //   setWeatherCheck(result);
        //   setQuery("");

        })
        .catch(err => {
            console.log(err)
        })
    })
    return(
        <div>
            {users.map(user => {
                <li key={user.id}>{user.title}</li>
            })}
        </div>
    )
}

export default ProfileFetching;
