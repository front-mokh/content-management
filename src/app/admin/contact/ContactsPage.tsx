"use client";
import CustomPagination from "@/components/custom/CustomPagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Contact } from "@prisma/client";
import React from "react";
import ContactsTable from "./ContactsTable";

export default function ContactsPage({
  contacts,
}: {
  contacts: Contact[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<Contact>(contacts, 8);
  
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestion des Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactsTable contacts={pageItems} />
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