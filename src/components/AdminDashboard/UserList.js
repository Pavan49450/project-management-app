// src/components/UserDashboard/UserList.js
import React from "react";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="border p-4 mb-2">
          <h3 className="font-bold">{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Status: {user.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
