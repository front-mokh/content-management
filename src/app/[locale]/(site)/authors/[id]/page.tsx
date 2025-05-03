import { getAuthorById, getAuthorResources } from "@/lib/services/authorService";
import { getDictionary } from "@/lib/i18n";
import AuthorDetailPage from "./author-detail";
import { notFound } from "next/navigation";

export default async function AuthorDetail({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const author = await getAuthorById(params.id);
  
  if (!author) {
    return notFound();
  }
  
  const resources = await getAuthorResources(params.id);
  
  return (
    <div className="min-h-screen">
      <main>
        <AuthorDetailPage 
          author={author} 
          resources={resources} 
          dictionary={dictionary}
          locale={params.locale}
        />
      </main>
    </div>
  );
}
