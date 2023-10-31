// App.js

import React, { useState } from "react";
import './test.css';
import axios from "axios";

const Test = () => {
    const [state, setState] = useState({
        name: "",
        job: ""
    });

    const handleChange = (e : any) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        const userData = {
            name: state.name,
            job: state.job
        };
        axios.post("https://reqres.in/api/users", userData).then((response) => {
            console.log(response.status, response.data);
            console.log("state = " + state);
        });
    };

    return (
        <div>
            <h1>Register or Create new account</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="job">
                    Job
                    <input
                        type="text"
                        name="job"
                        value={state.job}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};


// import { useEffect, useState } from "react"
// import axios from "axios";

// interface User {
//     id: number;
//     name: string
// }

// function Test() {
//     const [users, setUsers] = useState<User[]>([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         axios
//             .get<User[]>("https://jsonplaceholder.typicode.com/users")
//             .then((res) => setUsers(res.data))
//             .catch(err => {
//                 setError(err.message);
//             });
//     }, []);

//     return (
//         <>
//             {error && <p className="text-danger">{error}</p>}
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.id}>{user.name}</li>
//                 ))}
//             </ul>
//         </>
//     );
// }

export default Test;

