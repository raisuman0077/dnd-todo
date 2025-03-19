import React, { useMemo, useRef, useState } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import Button from "../Button";
import TextArea from "../TextArea";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../actions/todo";
const init = {
  title: "",
  date: "",
  description: "",
};

const index = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputDateRef = useRef(null);
  const todoData = useSelector((state) => state.todo);
  const orderedTodoData = useSelector((state) => state.orderedTodo);
  const [value, setValue] = useState({ ...init });

  const todoDataArr = useMemo(() => {
    const todoKeys = new Set(Object.keys(todoData || {}));
    const orderedKeys = Object.keys(orderedTodoData || {}).filter((key) =>
      todoKeys.has(key)
    );

    const newKeys = Object.keys(todoData || {}).filter(
      (key) => !orderedKeys.includes(key)
    );

    return [...newKeys, ...orderedKeys].map((key) => todoData[key]);
  }, [todoData, orderedTodoData]);

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
    setOpen();
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
      title="Add New To-Do"
      isOpen={open}
      onClose={() => {
        setOpen();
        setValue(init);
      }}
      Button={AddButton}
    >
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
        rows="5"
        style={{ width: "60%" }}
      />
    </Modal>
  );
};

export default index;
