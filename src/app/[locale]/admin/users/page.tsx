import { getAllUsers } from "@/lib/services";
import React from "react";
import UsersPage from "./UsersPage";

export default async function page() {
  const users = await getAllUsers();
  return (
    <div className="h-full">
      <UsersPage users={users} />
    </div>
  );
}