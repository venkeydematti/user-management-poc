import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";  

export default function UserList({ users, onEditUser, onDeleteUser }) {
    //For checking if the user list is empty
  if (users.length === 0) {
    return <p className="text-gray-500">No users added yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium font-semibold">Name</TableHead>
          <TableHead className="font-medium font-semibold">Email</TableHead>
          <TableHead className="text-right font-medium font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              {user.name}
            </TableCell>

            <TableCell>{user.email}</TableCell>

            <TableCell className="text-right space-x-2">
              <Button onClick={() => onEditUser(user)} variant="outline">
                Edit
              </Button>
              <Button onClick={() => onDeleteUser(user.id)} variant="destructive">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
