"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

  export default function AddUserDialog({
    onAddUser,
    onUpdateUser,
    selectedUser,
    onClearSelection
  }) {
    //For storing the user's name and email
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    //For hiding the dialog after submission
    const [open, setOpen] = useState(false);

    //For showing the success message after submission
    const [successMessage, setSuccessMessage] = useState("");

    // Open dialog & prefill when editing
    useEffect(() => {
      if (selectedUser) {
        setName(selectedUser.name);
        setEmail(selectedUser.email);
        setOpen(true);
      }
    }, [selectedUser]);

    //For handling the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !email) return;
      console.log("SUBMIT CLICKED", { name, email, selectedUser });
      //For adding the user to the list
      if (selectedUser) {
        onUpdateUser({
          ...selectedUser,
          name,
          email,
        });
        setSuccessMessage("User updated successfully");
      } else {
        onAddUser({
          id: Date.now(),
          name,
          email,
        });
        setSuccessMessage("User added successfully");
      }

      //Clear the edit mode
      onClearSelection();   // clear edit mode
      setOpen(false);       // close dialog
      setName("");          // reset form
      setEmail("");
      //For showing the success message after submission
      setSuccessMessage("User added successfully");
    }

    // Open dialog & prefill when editing
    useEffect(() => {
      if (!selectedUser) return;
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setOpen(true);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, [selectedUser]);

    // Autohide the success message
    useEffect(() => {
      if (!successMessage) return;
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    
      return () => clearTimeout(timer);
    }, [successMessage]);

    //For rendering the dialog
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        {/* Only clickable element must be inside dialog trigger */}
        <DialogTrigger asChild>
          <Button size="lg" onClick={() => setOpen(true)}>Add User</Button>
        </DialogTrigger>
        {successMessage && (
            <p className="mt-4 text-green-600 font-medium">
              {successMessage}
            </p>
          )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="pb-2" htmlFor="name">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                name="name"
                id="name"
                type="text"
              />
            </div>
  
            <div>
              <Label className="pb-2" htmlFor="email">Email Address</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                name="email"
                id="email"
                type="email"
              />
            </div>
  
            <Button type="submit">Save User</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
}