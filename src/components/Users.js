import React from "react";
import User from "./User";
import { BiSearchAlt, BiLogOutCircle } from "react-icons/bi";

function Users({ users, usersView, setUsersView }) {
  return (
    <div className={`users-comp ${usersView ? "activated-users" : ""}`}>
      <BiLogOutCircle
        onClick={() => setUsersView(!usersView)}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "grey",
          fontSize: "1.3rem",
          cursor: "pointer",
        }}
      />
      <div className="utilizatori">
        {users && users.length
          ? users.map((u) => <User u={u} key={u.id} />)
          : null}
      </div>
    </div>
  );
}

export default Users;
