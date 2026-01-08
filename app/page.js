"use client";

import { useState } from "react";
import AddUserDialog from "./components/AddUserDialog";
import UserList from "./components/UserList";

export default function Home() {
  //For storing the user list
  const [users, setUsers] = useState([]);

  //For adding a new user to the list
  function handleAddUser(newUser) {
    setUsers((prev) => [...prev, newUser]);
  }

  return (
    <main className="p-6 space-y-6">
      <AddUserDialog onAddUser={handleAddUser} />
      <UserList users={users} />
    </main>
  );
}
