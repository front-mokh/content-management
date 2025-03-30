import DeleteAction from "@/components/custom/DeleteAction";
import TableWrapper from "@/components/custom/TableWrapper";
import ViewAction from "@/components/custom/ViewAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Contact } from "@prisma/client";
import React from "react";

import DeleteContactDialog from "./DeleteContactDialog";
export default function ContactsTable({
  contacts,
}: {
  contacts: Contact[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Date de contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.lastName}</TableCell>
              <TableCell className="font-medium">{contact.firstName}</TableCell>
              <TableCell>{contact.email || "-"}</TableCell>
              <TableCell>{contact.phoneNumber || "-"}</TableCell>
              <TableCell>{formatDate(contact.createdAt)}</TableCell>
              <TableCell>
                <div className="space-x-2">
                <ViewAction href={`/admin/contact/${contact.id}`} />
                    <DeleteContactDialog
                    trigger={<DeleteAction />}
                    contact={contact}
                  />
                  {/* <DeleteConfirmationDialog
                    trigger={<DeleteAction />}
                    title={`Supprimer le contact ${contact.firstName} ${contact.lastName}`}
                    description={`Êtes-vous sûr de vouloir supprimer le contact ${contact.firstName} ${contact.lastName} ?`}
                    isDeleting={false} // You'll need to manage this state or pass it as a prop
                    onConfirm={() => {
                      // Handle the delete action here
                      // This could be a function passed as a prop or a direct API call
                      console.log(`Deleting contact: ${contact.id}`);
                    }}
                  /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}