import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../Button";
import Modal from "../Modal";
import InputField from "../InputField";
import TextArea from "../TextArea";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { updateTodo } from "../../actions/todo";

const index = ({ open, onClose, data }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [value, setValue] = useState({ ...data });
  const { id = "", title = "", date = "", description = "" } = data;

  const handleChange = (s, v) => {
    setValue((prev) => ({ ...prev, [s]: v }));
  };

  const handleUpdate = () => {
    const _title = capitalizeFirstLetter(value.title);
    if (_title === title && value.date === date && description === value.description) {
      dispatch({
        type: "SET_SNACKBAR",
        payload: {
          type: "error",
          message: "Nothing is Changed",
        },
      });
      return;
    }
    const req = { id, title: _title, description: value.description, date: value.date };
    dispatch(updateTodo(req));
    dispatch({
      type: "SET_SNACKBAR",
      payload: {
        type: "success",
        message: "Updated successfully.",
      },
    });
    onClose(false);
  };

  const UpdateButton = () => (
    <Button onClick={handleUpdate} style={{ width: "150px", margin: "0 0 10px 20px" }}>
      Update
    </Button>
  );

  return (
    <Modal title="Edit Details" isOpen={open} onClose={onClose} Button={UpdateButton}>
      <InputField
        title="Date"
        type="date"
        value={value.date}
        onChange={(e) => handleChange("date", e.target.value)}
        style={{ width: "150px" }}
      />
      <InputField
        title="Task Title"
        value={value.title}
        ref={inputRef}
        focus={true}
        onChange={(e) => handleChange("title", e.target.value)}
        style={{ width: "60%" }}
      />

      <TextArea
        title="Task Description"
        value={value.description}
        placeholder="Description"
        onChange={(e) => handleChange("description", e.target.value)}
        rows="5"
        style={{ width: "60%" }}
      />
    </Modal>
  );
};

export default index;
