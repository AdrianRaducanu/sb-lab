import React, { useState } from "react";
import Book from "./Book";
import { BiSearchAlt, BiLogOutCircle } from "react-icons/bi";

function Books({
  setCarti,
  carti,
  librarie,
  setLibrarie,
  cartiCitite,
  setCartiCitite,
  idulProfilului,
}) {
  //functia de cautare
  const [text, setText] = useState("");
  const funcText = (e) => {
    setText(e.target.value);
  };
  const funcBtn = () => {
    const selectedBooks = carti.filter((c) => {
      return (
        c.title.toLowerCase().includes(text.toLowerCase()) ||
        c.author.toLowerCase().includes(text.toLowerCase())
      );
    });
    setCarti(selectedBooks);
    setText("");
  };
  return (
    <div className={`books ${librarie ? "activated" : ""}`}>
      <BiLogOutCircle
        onClick={() => setLibrarie(!librarie)}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "grey",
          fontSize: "1.3rem",
          cursor: "pointer",
          overflow: "inherit",
        }}
      />
      <div className="list-books">
        <form>
          <input
            placeholder="Search by title/author"
            value={text}
            onChange={funcText}
          ></input>
          <BiSearchAlt
            style={{ color: "grey", fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => funcBtn()}
          />
        </form>
        <div className="book">
          {carti && carti.length
            ? carti.map((c) => (
                <Book
                  key={c.id}
                  c={c}
                  cartiCitite={cartiCitite}
                  setCartiCitite={setCartiCitite}
                  idulProfilului={idulProfilului}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
export default Books;
