import DeleteAction from "@/components/custom/DeleteAction";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import TableWrapper from "@/components/custom/TableWrapper";
import UpdateAction from "@/components/custom/UpdateAction";
import UpdateUserDialog from "@/components/users/UpdateUserDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { User } from "@prisma/client";
import React from "react";

export default function UsersTable({
  users,
}: {
  users: User[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom d'utilisateur</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Date de modification</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>{formatDate(user.updatedAt)}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <UpdateUserDialog
                    trigger={<UpdateAction />}
                    user={user}
                  />
                  <DeleteUserDialog
                    trigger={<DeleteAction />}
                    user={user}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}