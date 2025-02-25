import React, { useRef } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import TextArea from "../../components/TextArea";
import { init } from "./setup";
import { useDispatch } from "react-redux";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { addTodo } from "../../actions/todo";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const AddTask = ({ value, setValue, open, setOpen, todoDataArr }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputDateRef = useRef(null);

  const handleChange = (s, v) => {
    setValue((prev) => ({ ...prev, [s]: v }));
  };

  const handleAdd = () => {
    if (!value.title) return;
    const id = generateUniqueId(todoDataArr);
    const _title = capitalizeFirstLetter(value.title);
    const _description = capitalizeFirstLetter(value.description);
    const req = {
      id: id,
      title: _title,
      date: value.date,
      description: _description,
      status: "pending",
    };
    dispatch(addTodo(req));
    dispatch({
      type: "SET_SNACKBAR",
      payload: {
        type: "success",
        message: "TO-DO successfully Added",
      },
    });
    setValue(init);
    setOpen((prev) => ({ ...prev, openAddModal: false }));
  };
  const AddButton = () => (
    <Button
      onClick={() => handleAdd()}
      style={{ width: "150px", margin: "0px 0px 8px 20px" }}
    >
      Add
    </Button>
  );

  return (
    <Modal
      title="Add New Task"
      isOpen={open}
      onClose={() => {
        setOpen((prev) => ({ ...prev, openAddModal: false }));
        setValue({ ...init });
      }}
      Button={AddButton}
    >
      <div style={{ marginTop: "2px" }}>
        <InputField
          title="Date"
          ref={inputDateRef}
          value={value.date}
          type="date"
          onChange={(e) => handleChange("date", e.currentTarget.value)}
          style={{
            width: "120px",
          }}
        />
        <InputField
          title="Task Title"
          ref={inputRef}
          value={value.title}
          type="text"
          focus={true}
          placeholder="Task title"
          onChange={(e) => handleChange("title", e.currentTarget.value)}
          style={{ width: "60%" }}
        />
        <TextArea
          title="Task Description"
          value={value.description}
          placeholder="Description"
          onChange={(e) => handleChange("description", e.currentTarget.value)}
          rows="4"
          style={{ width: "60%" }}
        />
      </div>
    </Modal>
  );
};

export default AddTask;
