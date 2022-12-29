import React, { useEffect, useState } from "react";
import userService from "../services/user.service2";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersList = () => {
  const [users, setItems] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    userService
      .getAll()
      .then((response) => {
        console.log("Printing User data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    userService
      .remove(id)
      .then((response) => {
        console.log("User deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>Users List</h3>
      <hr />
      <div>
        {/* <Link to = "/users/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Add User</Link> */}
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`/users/edit/${user.id}`}
                    className="btn btn-outline-success"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default UsersList;