// app/admin/contacts/[id]/page.tsx
import ContactDetailsPage from "./ContactDetailsPage";
import { getContactById } from "@/lib/services/contactService";
import { notFound } from "next/navigation";
import React from "react";

export default async function ContactDetails({ params }: { params: { id: string } }) {
  const contactId = params.id;
  const contact = await getContactById(contactId);
  
  if (!contact) {
    notFound();
  }
  
  return (
    <div>
      <ContactDetailsPage contact={contact} />
    </div>
  );
}
