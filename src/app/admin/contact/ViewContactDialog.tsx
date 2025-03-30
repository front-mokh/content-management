"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Contact } from "@prisma/client";
import React from "react";
import { formatDate } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewContactDialogProps {
  trigger: React.ReactNode;
  contact: Contact;
}

export default function ViewContactDialog({
  trigger,
  contact,
}: ViewContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Détails du contact</DialogTitle>
          <DialogDescription>
            Informations et message de {contact.firstName} {contact.lastName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nom</p>
              <p className="text-sm mt-1">{contact.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Prénom</p>
              <p className="text-sm mt-1">{contact.firstName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm mt-1">{contact.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Téléphone</p>
              <p className="text-sm mt-1">{contact.phoneNumber || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date de contact</p>
              <p className="text-sm mt-1">{formatDate(contact.createdAt)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
            <ScrollArea className="max-h-[200px] rounded-md border p-4">
              <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}