import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { MdArrowForwardIos } from "react-icons/md";
import Dropdown from "../Dropdown";
import DetailsUI from "../DetailsUI";
import InputField from "../InputField";

import "../../css/TableUI.css";

const ITEMS_PER_PAGE = 13;

const options = {
  pending: [
    { title: "Completed", value: "completed" },
    { title: "In-Complete", value: "incomplete" },
    { title: "Canceled", value: "canceled" },
  ],
  completed: [
    { title: "Pending", value: "pending" },
    { title: "In-Complete", value: "incomplete" },
    { title: "Canceled", value: "canceled" },
  ],
  incomplete: [
    { title: "Pending", value: "pending" },
    { title: "Completed", value: "completed" },
    { title: "Canceled", value: "canceled" },
  ],
};

const index = ({ data, handleRightClick, handleSelect, onDragEnd }) => {
  const [displayData, setDisplayData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const handleRightClickRow = useCallback((e, row) => {
    if (!row) return;
    handleRightClick(e, row);
  }, []);

  const handleChange = (newPage) => {
    setPage(newPage);
    setDisplayData(null);
    setShowDetail(false);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const filteredData = debouncedQuery
    ? data.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : data;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const selectedTasks = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div>
      <InputField
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "400px", marginTop: "6px", marginBottom: "4px" }}
      />
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          className="main-container"
          style={{
            width: showDetail ? "70%" : "97%",
            transition: "width 0.2s ease-in-out",
            minHeight: "75dvh",
          }}
        >
          <div className="table-header">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "30%",
              }}
            >
              <div>SN.</div>
              <div>Status</div>
              <div style={{ minWidth: "100px", textAlign: "right" }}>Date</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "70%",
                gap: "60px",
              }}
            >
              <div>Task Title</div>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid black", width: "100%" }} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {selectedTasks.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          className="dragable-container"
                          onContextMenu={(e) => handleRightClickRow(e, item)}
                          onClick={() => {
                            setShowDetail(true);
                            setDisplayData(item);
                          }}
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
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "30%",
                              }}
                            >
                              <div>{index + 1}.</div>
                              <div>
                                <Dropdown
                                  title={item.status}
                                  options={options[item.status]}
                                  onSelect={(v) => handleSelect(v, item.id)}
                                />
                              </div>

                              <div style={{ minWidth: "100px", textAlign: "right" }}>
                                {item.date}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "70%",
                                gap: "60px",
                              }}
                            >
                              <div> {item.title}</div>
                            </div>
                          </div>
                          {displayData && item.id === displayData.id && (
                            <MdArrowForwardIos />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div
            className="pagination-section"
            style={{
              width: showDetail ? "58%" : "81%",
              transition: "width 0.2s ease-in-out",
            }}
          >
            <button
              className="pagination-btn"
              onClick={() => handleChange(page - 1)}
              disabled={page === 1}
              style={{
                background: page === 1 ? "#e0e0e0" : "white",
                color: "#888",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              ‹
            </button>

            <button
              className="pagination-btn"
              onClick={() => handleChange(1)}
              style={{
                background: page === 1 ? "#767676" : "white",
                color: page === 1 ? "white" : "#888",
                fontWeight: page === 1 ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              1
            </button>

            {page > 3 && <span style={{ color: "#888" }}>...</span>}

            {page > 1 && page < totalPages && (
              <button
                className="pagination-btn"
                onClick={() => handleChange(page)}
                style={{
                  background: "#767676",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            )}

            {page < totalPages - 2 && <span style={{ color: "#888" }}>...</span>}

            <button
              className="pagination-btn"
              onClick={() => handleChange(totalPages)}
              style={{
                background: page === totalPages ? "#767676" : "white",
                color: page === totalPages ? "white" : "#888",
                fontWeight: page === totalPages ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {totalPages}
            </button>

            <button
              className="pagination-btn"
              onClick={() => handleChange(page + 1)}
              disabled={page === totalPages}
              style={{
                background: page === totalPages ? "#e0e0e0" : "white",
                color: "#888",
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              ›
            </button>
          </div>
        </div>

        {displayData && showDetail && (
          <div>
            <DetailsUI
              open={showDetail}
              data={displayData}
              setData={setDisplayData}
              close={() => setShowDetail(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
