import React, { useEffect, useState, useContext } from "react";
import { getUsersData, controller } from "../../util/api";
import UsersList from "../UsersList/UsersList";
import { appContext } from "../../context/appContext";

function AllUsers() {
  const [usersData, setsUsersData] = useState([]);
  const { isAddRemoveAdminClicked } = useContext(appContext);

  useEffect(async () => {
    try {
      const response = await getUsersData();
      setsUsersData(response.users);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, [isAddRemoveAdminClicked]);

  return (
    <div className="d-flex col-12 flex-column justify-content-center align-items-center">
      <div className="d-flex v-50 mt-5">
        <p className="display-5">All Users</p>
      </div>
      <UsersList usersData={usersData} />
    </div>
  );
}

export default AllUsers;
