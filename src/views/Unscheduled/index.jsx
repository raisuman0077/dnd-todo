import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionModal from "../../components/ActionModal";
import { deleteTodo, updateStatus } from "../../actions/todo";

import EditUI from "../../components/EditUI";
import TableUI from "../../components/TableUI";
import { updateUnScheduledPosition } from "../../actions/unScheduledTodo";

const index = () => {
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todo);
  const unScheduledTodoData = useSelector((state) => state.unScheduledTodo);
  const [selectedData, setSelectedData] = useState({});
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const [open, setOpen] = useState({
    openActionModal: false,
    openEditModal: false,
  });

  const todoDataArr = useMemo(() => {
    const todoKeys = new Set(Object.keys(todoData || {}));

    const filteredTodos = Object.keys(todoData || {}).filter(
      (key) => todoData[key].date === ""
    );

    const orderedKeys = Object.keys(unScheduledTodoData || {}).filter(
      (key) => filteredTodos.includes(key) && todoKeys.has(key)
    );

    const newKeys = filteredTodos.filter((key) => !orderedKeys.includes(key));

    return [...newKeys, ...orderedKeys].map((key) => todoData[key]);
  }, [todoData, unScheduledTodoData]);

  const [tasks, setTasks] = useState(todoDataArr);

  useEffect(() => {
    setTasks(todoDataArr);
  }, [todoDataArr]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
    dispatch(updateUnScheduledPosition(reorderedTasks));
  };

  const handleRightClick = (e, row) => {
    if (!row) return;
    setModalPosition({ x: e.clientX, y: e.clientY });
    setSelectedData(row);
    setOpen((prev) => ({ ...prev, openActionModal: true }));
  };

  const handleSelect = (action) => {
    if (!["edit", "delete"].includes(action)) {
      const req = { id: selectedData.id, status: action };
      dispatch(updateStatus(req));
      setOpen((prev) => ({ ...prev, openActionModal: false }));
    } else if (action === "delete") {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;
      const req = { id: selectedData.id };
      dispatch(deleteTodo(req));
      setOpen((prev) => ({ ...prev, openActionModal: false }));
    } else {
      setOpen((prev) => ({ ...prev, openEditModal: true, openActionModal: false }));
    }
  };

  return (
    <>
      {open.openEditModal && (
        <EditUI
          open={open.openEditModal}
          onClose={() => setOpen((prev) => ({ ...prev, openEditModal: false }))}
          data={selectedData}
        />
      )}

      {selectedData.id && open.openActionModal && (
        <ActionModal
          position={modalPosition}
          handleClick={(action) => handleSelect(action)}
          close={(e) => {
            e.stopPropagation();
            setSelectedData({});
            setModalPosition({ x: 0, y: 0 });
            setOpen((prev) => ({
              ...prev,
              openActionModal: false,
            }));
          }}
        />
      )}

      <TableUI
        data={tasks}
        handleRightClick={handleRightClick}
        handleSelect={handleSelect}
        onDragEnd={onDragEnd}
      />
    </>
  );
};

export default index;
