import React, {useRef, useState, useEffect} from 'react';
import SingleUser from "../components/SingleUser";

const HomePage = () => {

    const [getUser, setUser] = useState([])

    const nameRef = useRef()
    const genderRef = useRef()
    const emailRef = useRef()
    const heightRef = useRef()
    const imageRef = useRef()
    const searchRef = useRef()

    function addUser() {
        const userCard = {
            image: imageRef.current.value,
            name: nameRef.current.value,
            gender: genderRef.current.value,
            email: emailRef.current.value,
            height: heightRef.current.value,
        }
        imageRef.current.value = ""
        nameRef.current.value = ""
        genderRef.current.value = ""
        emailRef.current.value = ""
        heightRef.current.value = ""

        console.log(userCard)
        setUser([...getUser, userCard])

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userCard)
        }

        fetch("http://localhost:4000/createUser", options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data.users)
            })
    }

    const getAllFetch = () => {
        fetch("http://localhost:4000/allUsers")
            .then(res => res.json())
            .then(data => {
                    console.log(data)
                    setUser(data.data)
            })
    }
    useEffect(() => {
            getAllFetch()
    }, [])

    const userSearch = () => {

            const sendData = {
                title: searchRef.current.value
            }
            searchRef.current.value = ""

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(sendData)
            }
            fetch("http://localhost:4000/search", options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setUser(data.data)
                })
    }
        return (
            <div className="App d-flex">
                    <div className="d-flex fd-column bar m-10">
                        <input ref={nameRef} type="text" placeholder= "username"/>
                        <input ref={genderRef} type="text" placeholder= "gender"/>
                        <input ref={emailRef} type="text" placeholder= "e-mail"/>
                        <input ref={heightRef} type="text" placeholder= "height" />
                        <input ref={imageRef} type="text" placeholder= "image url"/>
                        <button onClick={addUser}>ADD USER</button>
                        <input ref={searchRef} type="text" placeholder="username"/>
                        <button onClick={userSearch}>SEARCH</button>
                    </div>
                    <div className="d-flex fd-column">
                        <div>
                            <h2>USER CARDS: </h2>
                        </div>
                        <div className ="d-flex main">
                            <div className="d-flex f-wrap">
                                {getUser.map((x, i) => <SingleUser getAll={getAllFetch} key={i} item={x}/>)}
                            </div>
                        </div>
                    </div>
            </div>
        );
};

export default HomePage;
