import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    try {
      if (description !== "") {
        const body = { description };
        const response = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        window.location = "/";
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box className="container">
      <h1>Input Todo</h1>
      <Box display="flex">
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          inputProps={{ style: { padding: "10px", width: "500px" } }}
        />
        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default InputTodo;
