import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "../../css/DetailUI.css";
import Modal from "../Modal";

const InfoSection = ({ data, setData, open, close }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    } else {
      setShow(false);
    }
  }, [data, open]);

  if (!data) return null;

  return (
    <Modal
      title="Details"
      isOpen={open}
      onClose={() => {
        setData(null);
        close();
      }}
    >
      <div style={{ paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontWeight: 800, fontSize: "20px" }}>Title:</p>
          <p style={{ margin: 0, marginLeft: 4 }}>{data.title}</p>
        </div>
        {data.date && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontWeight: 800, fontSize: "20px" }}>Date:</p>
            <p style={{ margin: 0, marginLeft: 4 }}>{data.date}</p>
          </div>
        )}
        <div className="description-section">
          <p style={{ fontWeight: 800 }}>Description:</p>
          {data.description ? (
            <>
              <p className="description">{data.description}</p>
              <div className="description-placeholder">
                {[...Array(2)].map((_, i) => (
                  <span key={i}></span>
                ))}
              </div>
            </>
          ) : (
            <div className="description-placeholder">
              {[...Array(4)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InfoSection;
