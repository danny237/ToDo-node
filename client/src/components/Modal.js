import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Box } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModal({ open, setOpen, editTodo }) {
  const [description, setDescription] = React.useState(editTodo.description);

  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const Title = () => {
    return <h2 style={{ borderBottom: "1px solid black" }}>Edit</h2>;
  };

  const onCancel = () => {
    setDescription("");
    setOpen(false);
  };

  const onSave = async () => {
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${editTodo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Title />
            <h5>Description</h5>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              inputProps={{ style: { padding: "10px", width: "500px" } }}
            />
            <Box style={{ marginTop: "10px" }}>
              <button className="btn mr-2" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={onSave}>
                Save
              </button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
