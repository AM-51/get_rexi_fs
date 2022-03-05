import React, { useContext, useState } from "react";
import ProfileData from "../ProfileData/ProfileData";
import EditProfile from "../EditProfile/EditProfile";

function ProfilePage() {
  const [isEditProfileOn, setIsEditProfileOn] = useState(false);

  return (
    <div className="d-flex flex-column">
      {!isEditProfileOn && (
        <ProfileData setIsEditProfileOn={setIsEditProfileOn} />
      )}
      {isEditProfileOn && (
        <EditProfile setIsEditProfileOn={setIsEditProfileOn} />
      )}
    </div>
  );
}

export default ProfilePage;
