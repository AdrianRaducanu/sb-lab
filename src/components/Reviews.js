import React from "react";
import Review from "./Review";
import { BiLogOutCircle } from "react-icons/bi";

function Reviews({ librarieReview, setLibrarieReview, apiReview }) {
  return (
    <div className={`reviews ${librarieReview ? "activated-rev" : ""}`}>
      <BiLogOutCircle
        onClick={() => setLibrarieReview(!librarieReview)}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "grey",
          fontSize: "1.3rem",
          cursor: "pointer",
        }}
      />
      <div className="all-reviews">
        {apiReview && apiReview.length
          ? apiReview.map((c) =>
              c.review ? <Review c={c} key={c.id} /> : null
            )
          : null}
      </div>
    </div>
  );
}
export default Reviews;
