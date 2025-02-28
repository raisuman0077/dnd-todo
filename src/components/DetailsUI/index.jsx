import React from "react";

const index = ({ data }) => {
  if (!data) return <></>;

  return (
    <div className={"info-section"}>
      <p style={{ fontWeight: 600, fontSize: 18, marginTop: 10 }}>Details</p>
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
  );
};

export default index;
