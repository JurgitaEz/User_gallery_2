import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import SingleUser from "../components/SingleUser";

const SingleUserPage = () => {

    const nav = useNavigate()
    const goHome = () => {
        nav("/")
    }

    const [getUser, setUser] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        fetch("http://localhost:4000/singleUser/"+id)
                   .then (res => res.json())
                   .then (data => {
                       console.log(data)
                       setUser(data)
                   })
    },[])

    return (
        <div>
            <h1>SINGLE USER PAGE</h1>
            <button onClick={goHome}>GO HOME</button>
            {getUser && <SingleUser item={getUser}/>}
        </div>
    );
};

export default SingleUserPage;