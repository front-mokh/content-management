"use client";
import AddUserDialog from "@/components/users/AddUserDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { User } from "@prisma/client";
import React from "react";
import UsersTable from "./UsersTable";

export default function UsersPage({
  users,
}: {
  users: User[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<User>(users, 3);

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Gestion des Utilisateurs</CardTitle>
          <AddUserDialog />
        </CardHeader>
        <CardContent>
          <UsersTable users={pageItems} />
        </CardContent>
        <CardFooter>
          {totalPages > 1 && (
            <div className="mt-6">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}