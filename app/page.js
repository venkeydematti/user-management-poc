"use client";

import { useState } from "react";
import AddUserDialog from "./components/AddUserDialog";
import UserList from "./components/UserList";

export default function Home() {
  //For storing the user list
  const [users, setUsers] = useState([]);
  //For storing the selected user ( Eidt / Delete )
  const [selectedUser, setSelectedUser] = useState(null)

  console.log(users);
  //For adding a new user to the list
  function handleAddUser(newUser) {
    setUsers((prev) => [...prev, newUser]);
  }

  //For editing a user
  function handleEditUser(user) {
    setSelectedUser(user);
  }

  //For updating a user
  function handleUpdateUser(updatedUser) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }
  
  //For deleting a user
  function handleDeleteUser(id) {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }


  return (
    <main className="p-6 space-y-6 w-full max-w-7xl mx-auto">
      <AddUserDialog
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        selectedUser={selectedUser}
        onClearSelection={() => setSelectedUser(null)}
      />
      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </main>
  );
}
