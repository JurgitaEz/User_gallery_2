import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const SingleUser = ({item, getAll}) => {

    const nav = useNavigate()
    const navToUser = () => {
        nav("/user/"+item._id)
    }

    const inputRef = useRef()

    const updateUser = () => {

        const updateUser = {
            id:item._id,
            image: inputRef.current.value
        }
        inputRef.current.value = ""

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateUser)
        }

        fetch("http://localhost:4000/update" + item._id, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getAll()
            })
    }

    const deleteUser = () =>{
        fetch("http://localhost:4000/delete" + item.id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getAll()
            })
    }


    return (
        <div className="d-flex fd-column j-center al-center border p-10">
                <img src={item.image} alt=""/>
                <h3 className="textLink" onClick={navToUser}>{item.name}</h3>
                <p>e-mail: {item.email}</p>
                <p>Height: {item.height}</p>
                <input ref={inputRef} type="text"/>
                <button onClick={updateUser}>UPDATE</button>
                <button onClick={deleteUser}>DELETE</button>
        </div>
    );
};
export default SingleUser;