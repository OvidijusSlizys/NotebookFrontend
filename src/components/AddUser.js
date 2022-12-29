import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import userService from "../services/user.service2";

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const user = {username, password, email, id};
    const saveUser = (e) => {
        e.preventDefault();
        console.log(user);
        
        if (id) {
            // update record
            userService.update(user)
                .then(response => {
                    console.log('User data updated successfully', response.data);
                    navigate('/users'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            userService.create(user)
            .then(response => {
                console.log('user added successfully',  response.data);
                navigate('/users');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        console.log(user)
        if (id) {
          userService.get(id)
                .then(user => {
                    setUsername(user.data.username);
                    setPassword(user.data.password);
                    setEmail(user.data.email);
                   
                    
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Add user</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                     />

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Email Address"
                    /> 

                </div>
               
                <br />
                <div>
                    <button onClick={(e) => saveUser(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/users">Back to List</Link>
        </div>
    )
};

export default AddUser;