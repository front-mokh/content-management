"use client";

import {
  User,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Contact } from "@prisma/client";
import InformationCard from "@/components/custom/InformationCard";
import TwoColumns from "@/components/custom/TwoColumns";
import { formatDate } from "@/lib/utils";
import Page from "@/components/custom/Page";
import DeleteAction from "@/components/custom/DeleteAction";
import DeleteConfirmationDialog from "@/components/custom/DeleteConfirmationDialog";

export default function ContactDetailsPage({
  contact,
}: {
  contact: Contact;
}) {
  return (
    <Page
      title={`Message de ${contact.lastName.toUpperCase()} ${contact.firstName}`}
      backButtonHref="/admin/contact"
      actions={
        <div className="flex gap-2">
          <DeleteConfirmationDialog
            trigger={<DeleteAction />}
            title={`Supprimer le contact ${contact.firstName} ${contact.lastName}`}
            description={`Êtes-vous sûr de vouloir supprimer le contact ${contact.firstName} ${contact.lastName} ?`}
            isDeleting={false}
            onConfirm={() => {
              // Handle delete logic here
              console.log(`Deleting contact: ${contact.id}`);
            }}
          />
        </div>
      }
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informations</CardTitle>
          <CardDescription>
            Coordonnées et détails sur le message 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TwoColumns>
            <InformationCard
              icon={User}
              label="Nom"
              value={contact.lastName.toUpperCase()}
            />
            <InformationCard
              icon={User}
              label="Prénom"
              value={contact.firstName}
            />
            <InformationCard
              icon={Mail}
              label="Email"
              value={contact.email || "Non renseigné"}
            />
            <InformationCard
              icon={Phone}
              label="Téléphone"
              value={contact.phoneNumber || "Non renseigné"}
            />
            <InformationCard
              icon={Calendar}
              label="Date de contact"
              value={formatDate(contact.createdAt)}
            />
            
          </TwoColumns>

          {contact.message && (
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <h3 className="text-md font-medium">Message</h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-md border">
                <p className="text-sm">{contact.message}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Page>
  );
}