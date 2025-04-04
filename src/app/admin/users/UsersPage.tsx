"use client";
import { User } from "@prisma/client";
import React from "react";
import UsersTable from "./UsersTable";
import AddUserDialog from "@/components/users/AddUserDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom/CustomPagination";

export default function UsersPage({ users }: { users: User[] }) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<User>(users, 8);
  
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
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