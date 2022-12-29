import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import toDoListItemService from "../services/toDoListItem.service";

const AddToDoListItem = () => {
    const [content, setContent] = useState('');
    //const [userId, setUserId] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const toDoListItem = {content, createdAt, updatedAt, expiresAt, id};
    const saveToDoListItem = (e) => {
        e.preventDefault();
        console.log(toDoListItem);
        
        if (id) {
            // update record
            toDoListItemService.update(toDoListItem)
                .then(response => {
                    console.log('ToDoListItem data updated successfully', response.data);
                    navigate('/toDoListItems'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            toDoListItemService.create(toDoListItem)
            .then(response => {
                console.log('toDoListItem added successfully',  response.data);
                navigate('/toDoListItems');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        console.log(toDoListItem)
        if (id) {
            toDoListItemService.get(id)
                .then(toDoListItem => {
                    setContent(toDoListItem.data.content);
                    //setUserId(toDoListItem.data.userId);
                    setCreatedAt(toDoListItem.data.createdAt);
                    setUpdatedAt(toDoListItem.data.updatedAt);
                    setExpiresAt(toDoListItem.data.expiresAt);
                    
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Add toDoListItem</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                     />

                </div>
                {/* <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="userId"
                       value={userId}
                       onChange={(e) => setUserId(e.target.value)}
                       placeholder="User Id"
                    /> 

                </div> */}
                <div className="form-group">
                    <input
                       type="datetime-local"
                       className="form-control col-4"
                       id="createdAt"
                       value={createdAt}
                       onChange={(e) => setCreatedAt(e.target.value)}
                       placeholder="To do List Item Created At"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="datetime-local"
                       className="form-control col-4"
                       id="updatedAt"
                       value={updatedAt}
                       onChange={(e) => setUpdatedAt(e.target.value)}
                       placeholder="To do List Item Updated At"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="datetime-local"
                       className="form-control col-4"
                       id="expiresAt"
                       value={expiresAt}
                       onChange={(e) => setExpiresAt(e.target.value)}
                       placeholder="To Do List Item Expires At"
                    /> 

                </div>
                <br />
                <div>
                    <button onClick={(e) => saveToDoListItem(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/toDoListItems">Back to list</Link>
        </div>
    )
};

export default AddToDoListItem;