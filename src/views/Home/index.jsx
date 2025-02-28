import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../../css/Home.css";
import ActionModal from "../../components/ActionModal";
import StatusIcon from "../../components/StatusIcon";
import { deleteTodo, updateStatus } from "../../actions/todo";
import { updatePosition } from "../../actions/orderedTodo";

import { MdArrowForwardIos } from "react-icons/md";

import { init } from "./setup";
import EditUI from "../../components/EditUI";
import DetailsUI from "../../components/DetailsUI";

const index = () => {
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todo);
  const orderedTodoData = useSelector((state) => state.orderedTodo);
  const [value, setValue] = useState(init);
  const [selectedData, setSelectedData] = useState({});
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [data, setData] = useState(null);

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
  console.log(data, "dds");
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

      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 8,
        }}
      >
        <div className="main-container">
          <div className="table-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>SN.</div>
              <div>Status</div>
            </div>
            <div>Task</div>
          </div>
          <div style={{ borderBottom: "1px solid black" }} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          className="dragable-container"
                          onContextMenu={(e) => handleRightClick(e, item)}
                          onClick={() => setData(item)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="dragable-table">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "25px",
                              }}
                            >
                              <div>{index + 1}.</div>

                              <p
                                className="text-display"
                                style={{ textTransform: "capitalize" }}
                              >
                                {/* {item.status === "pending" ? (
                                    <MdOutlineCheckBoxOutlineBlank
                                      style={{ marginRight: "4px" }}
                                    />
                                  ) : item.status === "completed" ? (
                                    <MdOutlineCheckBox style={{ marginRight: "4px" }} />
                                  ) : (
                                    <></>
                                  )} */}
                                <StatusIcon status={item.status} />
                                {item.status}
                              </p>
                            </div>
                            <div> {item.title}</div>
                          </div>
                          {data && item.id === data.id && <MdArrowForwardIos />}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {data && (
          <div className={`"detail-ui" ${data && "active-detail-ui"}`}>
            <DetailsUI data={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default index;
