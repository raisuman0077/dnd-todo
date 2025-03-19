import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionModal from "../../components/ActionModal";
import { deleteTodo, updateStatus } from "../../actions/todo";
import { updatePosition } from "../../actions/orderedTodo";

import EditUI from "../../components/EditUI";
import TableUI from "../../components/TableUI";

const index = () => {
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todo);
  const orderedTodoData = useSelector((state) => state.orderedTodo);
  const [selectedData, setSelectedData] = useState({});
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const [open, setOpen] = useState({
    openActionModal: false,
    openEditModal: false,
  });

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
    dispatch(updatePosition(reorderedTasks));
  };

  const handleRightClick = useCallback((e, row) => {
    if (!row && !e) return;
    setModalPosition({ x: e.clientX, y: e.clientY });
    setSelectedData(row);
    setOpen((prev) => ({ ...prev, openActionModal: true }));
  }, []);

  const handleSelect = useCallback(
    (action, id) => {
      if (!["edit", "delete"].includes(action)) {
        dispatch(updateStatus({ id, status: action }));
      } else if (action === "delete") {
        if (window.confirm("Are you sure?")) {
          dispatch(deleteTodo({ id: selectedData.id }));
        }
      } else {
        setOpen((prev) => ({ ...prev, openEditModal: true, openActionModal: false }));
      }
      setOpen((prev) => ({ ...prev, openActionModal: false }));
    },
    [dispatch, selectedData.id]
  );

  return (
    <div>
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
    </div>
  );
};

export default index;
