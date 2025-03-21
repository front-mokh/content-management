// app/admin/submissions/converted/page.tsx
import {
    getConvertedSubmissions,
    getAllAuthors,
    getAllCategories,
    getAllTypes
  } from "@/lib/services";
  import React from "react";
  import ConvertedSubmissionsPage from "./ConvertedSubmissionsPage";
  
  export default async function Page() {
    const [submissions, categories, types, authors] = await Promise.all([
      getConvertedSubmissions(),
      getAllCategories(),
      getAllTypes(),
      getAllAuthors(),
    ]);
  
    return (
      <div className="h-full">
        <ConvertedSubmissionsPage
          submissions={submissions}
          categories={categories}
          types={types}
          authors={authors}
        />
      </div>
    );
  }