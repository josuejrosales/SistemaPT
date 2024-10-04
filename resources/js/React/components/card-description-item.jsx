import React from "react";

function CardDescriptionItem({ data }) {
  return (
    <div className="card-description-item">
      <div className="card-d-i-header">
        <div className="card-d-i-h-left">
          <h1>{data?.len || 0}</h1>
          <p>asas</p>
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-reception-2"
            viewBox="0 0 16 16"
          >
            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
          </svg>
        </span>
      </div>
      <div className="card-d-i-fotter">fotter</div>
    </div>
  );
}

export default CardDescriptionItem;
