import React, { useRef, useState } from "react";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../actions/todo";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import TextArea from "../../components/TextArea";

const EditUi = ({ open, onClose, selectedData }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { id = "", title = "", date = "", description = "" } = selectedData;
  const [value, setValue] = useState({ ...selectedData });
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
    onClose();
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

export default EditUi;
