"use client";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { locale } = useParams<{ locale: string }>();
  redirect(`/${locale}/media-library`);
  return <div>page</div>;
}
