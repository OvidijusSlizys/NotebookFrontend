import React, { useEffect, useState } from "react";
import toDoListItemService from "../services/toDoListItem.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ToDoListItemsList = () => {
  const [toDoListItems, setItems] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    toDoListItemService
      .getAll()
      .then((response) => {
        console.log("Printing ToDoListItem data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    toDoListItemService
      .remove(id)
      .then((response) => {
        console.log("ToDoListItem deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>ToDoListItems List</h3>
      <hr />
      <div>
        <Link to = "/toDoListItems/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Add ToDoListItem</Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Content</th>
              {/* <th>UserId</th> */}
              <th>Created at</th>
              <th>Updated at</th>
              <th>Expires at</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {toDoListItems.map((toDoListItem) => (
              <tr key={toDoListItem.id}>
                <td>{toDoListItem.content}</td>
                {/* <td>{toDoListItem.userId}</td> */}
                <td>{toDoListItem.createdAt}</td>
                <td>{toDoListItem.updatedAt}</td>
                <td>{toDoListItem.expiresAt}</td>
                <td>
                  <Link
                    to={`/toDoListItems/edit/${toDoListItem.id}`}
                    className="btn btn-outline-success"
                  >
                    Update
                  </Link>
                
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      handleDelete(toDoListItem.id);
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

export default ToDoListItemsList;