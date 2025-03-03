import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "../../css/DetailUI.css";

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
    <div className={`info-section`}>
      <div className={`info-display ${show ? "fade-in" : "fade-out"}`}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: 600, fontSize: 24, marginTop: 10 }}>Details</p>
          <IoMdCloseCircleOutline
            className="detail-close"
            size={30}
            onClick={() => {
              close();
              setData(null);
            }}
          />
        </div>
        <div className="info-container">
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: 500 }}>Title:</p>
            <p style={{ margin: 0, marginLeft: 4 }}>{data.title}</p>
          </div>
          {data.date && (
            <div style={{ display: "flex" }}>
              <p style={{ fontWeight: 500 }}>Date:</p>
              <p style={{ margin: 0, marginLeft: 4 }}>{data.date}</p>
            </div>
          )}
          <div className="description-section">
            <p style={{ fontWeight: 500 }}>Description:</p>
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
      </div>
    </div>
  );
};

export default InfoSection;
