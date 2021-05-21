import React, { useState } from "react";
import axios from "axios";
import { BiMessageSquareAdd } from "react-icons/bi";

function Book({ c, cartiCitite, setCartiCitite, idulProfilului }) {
  const [text, setText] = useState("");
  const funcText = (e) => {
    setText(e.target.value);
  };
  const funcAdd = () => {
    let carte = {
      id: c.id,
      title: c.title,
      author: c.author,
      review: text,
    };

    if (text !== "") {
      setCartiCitite([...cartiCitite, carte]);
      axios.put(
        "https://609c507904bffa001792cd3d.mockapi.io/user/" + idulProfilului,
        {
          books: [...cartiCitite, carte],
        }
      );
    }
    setText("");
  };
  return (
    <div className="book">
      <div className="title-author">
        <h3>{c.title}</h3>
        <h4>{c.author}</h4>
      </div>
      <div className="review">
        <textarea
          maxLength="100"
          placeholder="Your awesome review"
          cols="25"
          rows="4"
          value={text}
          onChange={funcText}
        ></textarea>
        <BiMessageSquareAdd
          style={{ color: "grey", fontSize: "1.3rem", cursor: "pointer" }}
          onClick={funcAdd}
        />
      </div>
    </div>
  );
}

export default Book;
