import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import EditModal from "./Modal";

const ListTodos = () => {
  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  //delete function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodoList(todoList.filter((item) => item.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodoList(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box className="container">
        <h1>List to todos ! </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.N</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr> */}
            {todoList.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditTodo(item);
                    }}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(item.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {open && (
          <EditModal open={open} setOpen={setOpen} editTodo={editTodo} />
        )}
      </Box>
    </>
  );
};

export default ListTodos;
