import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { MdArrowForwardIos } from "react-icons/md";
import Dropdown from "../Dropdown";
import DetailsUI from "../DetailsUI";
import DetailsModal from "../DetailsModal";
import InputField from "../InputField";

import "../../css/TableUI.css";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { options, filterOptions } from "./setup";

const Index = ({ data, handleRightClick, handleSelect, onDragEnd }) => {
  const dispatch = useDispatch(null);
  const [displayData, setDisplayData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const handleRightClickRow = useCallback((e, row) => {
    if (!row) return;
    handleRightClick(e, row);
  }, []);

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
  const finalFilteredData =
    filter === "all"
      ? filteredData
      : filteredData.filter((item) => item.status === filter);

  const onDrag = (req) => {
    if (searchQuery) {
      dispatch({
        type: "SET_SNACKBAR",
        payload: {
          type: "error",
          message: "Drag and Drop is disabled on filtered data",
        },
      });

      return;
    }
    onDragEnd(req);
  };

  return (
    <div className="table-section" style={{ overflow: "hidden" }}>
      <div className="filter-section">
        <InputField
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginTop: "6px" }}
        />
        <div className="filter-dropdown">
          <label style={{ fontWeight: "bold", color: "#3e3e3e" }}>Filter by:</label>
          <Dropdown
            title={capitalizeFirstLetter(filter)}
            options={filterOptions}
            onSelect={(v) => setFilter(v)}
          />
        </div>
      </div>
      <div className="table">
        <div className="main-table">
          <div className="table-header">
            <div>SN.</div>
            <div>Status</div>
            <div className="title-content">Task Title</div>
            <div className="date-content">Date</div>
          </div>

          <div style={{ borderBottom: "1px solid black" }} />
          {finalFilteredData.length > 0 ? (
            <div className="table-content">
              <DragDropContext onDragEnd={onDrag}>
                <Droppable droppableId="tasks">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {finalFilteredData.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              onContextMenu={(e) => handleRightClickRow(e, item)}
                              onClick={() => {
                                setShowDetail(true);
                                setDisplayData(item);
                              }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="dragable-row">
                                <div
                                  className="row-item"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>{index + 1}.</div>
                                  <div style={{ paddingTop: 2, paddingBottom: 2 }}>
                                    <Dropdown
                                      title={item.status}
                                      options={options[item.status]}
                                      onSelect={(v) => handleSelect(v, item.id)}
                                      icon={true}
                                    />
                                  </div>
                                  <div className="title-content">{item.title}</div>
                                  <div className="date-content">{item.date}</div>
                                </div>
                                {showDetail && item.id === displayData.id && (
                                  <MdArrowForwardIos />
                                )}
                              </div>
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
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "inherit",
              }}
            >
              <p style={{ color: "grey", fontSize: "2.5em" }}>No items!</p>
            </div>
          )}
        </div>

        {displayData && showDetail && (
          <>
            <div className="detail-ui">
              <DetailsUI
                open={showDetail}
                data={displayData}
                setData={setDisplayData}
                close={() => setShowDetail(false)}
              />
            </div>
            <div className="detail-modal">
              <DetailsModal
                open={showDetail}
                data={displayData}
                setData={setDisplayData}
                close={() => setShowDetail(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
