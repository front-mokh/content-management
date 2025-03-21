import { 
    getAcceptedSubmissions, 
    getAllAuthors, 
    getAllCategories, 
    getAllTypes 
  } from "@/lib/services";
  import React from "react";
  import AcceptedSubmissionsPage from "./AcceptedSubmissionsPage";
  
  export default async function Page() {
    const [submissions, categories, types, authors] = await Promise.all([
      getAcceptedSubmissions(),
      getAllCategories(),
      getAllTypes(),
      getAllAuthors(),
    ]);
    
    return (
      <div className="h-full">
        <AcceptedSubmissionsPage 
          submissions={submissions} 
          categories={categories}
          types={types}
          authors={authors}
        />
      </div>
    );
  }