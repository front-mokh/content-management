"use client";
import { User } from "@prisma/client";
import React from "react";
import UsersTable from "./UsersTable";
import AddUserDialog from "@/components/users/AddUserDialog";
import Page from "@/components/custom/Page";

export default function UsersPage({ users }: { users: User[] }) {
  return (
    <Page
      title="Gestion des Utilisateurs"
      description="Créer, modifier et gérer les comptes utilisateurs du système"
      backButtonHref="" 
      actions={<AddUserDialog />}
    >
      <UsersTable users={users} />
    </Page>
  );
}