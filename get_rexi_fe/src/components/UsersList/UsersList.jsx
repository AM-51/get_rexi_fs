import React from "react";
import UserFullCard from "../UserFullCard/UserFullCard";
import { v4 as uuidv4 } from "uuid";

function UsersList(props) {
  return (
    <div className="d-flex col-12 justify-content-center">
      <div className="d-flex col-12 justify-content-center flex-column align-items-center">
        {props.usersData &&
          props.usersData.map((user) => (
            <UserFullCard key={uuidv4()} user={user} />
          ))}
      </div>
    </div>
  );
}

export default UsersList;
