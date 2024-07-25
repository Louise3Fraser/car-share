import React from "react";
import "../../style/Welcome.css";
import moment from "moment";

export default function Welcome() {
  const user = sessionStorage.getItem("user");
  const userObject = JSON.parse(user);

  function formatDate() {
    const today = new Date();
    return moment(today).format("Do, MMMM");
  }

  return (
    <div
      className="welcome"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <h2>Welcome back, {userObject.name}! </h2>
      <h2>{formatDate()} </h2>
    </div>
  );
}
