import { getAllContacts } from "@/lib/services/contactService";
import React from "react";
import ContactsPage from "./ContactsPage";

export default async function page() {
  const contacts = await getAllContacts();
  return (
    <div className="h-full">
      <ContactsPage contacts={contacts} />
    </div>
  );
}
