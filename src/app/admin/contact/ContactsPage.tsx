"use client";
import CustomPagination from "@/components/custom/CustomPagination";
import { CardFooter } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Contact } from "@prisma/client";
import React from "react";
import ContactsTable from "./ContactsTable";
import Page from "@/components/custom/Page";

export default function ContactsPage({
  contacts,
}: {
  contacts: Contact[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<Contact>(contacts, 5);
  
  return (
    <Page
      title="Gestion des Messages"
      backButtonHref=""
    >
      <div className="space-y-6">
        <ContactsTable contacts={pageItems} />
        {totalPages > 1 && (
          <CardFooter className="px-0">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CardFooter>
        )}
      </div>
    </Page>
  );
}
