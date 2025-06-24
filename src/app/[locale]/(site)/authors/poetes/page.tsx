import {  getAuthorsByCcategory } from "@/lib/services/authorService";
import AuthorsPage from "../AuthorsPage";
import { getDictionary } from "@/lib/i18n";
import { AuthorCategory } from "@prisma/client";

export default async function Authors({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const authors = await getAuthorsByCcategory(AuthorCategory.POETES, 0, 100);
  
  return (
    <div className="min-h-screen">
      <main>
        <AuthorsPage authors={authors} dictionary={dictionary} />
      </main>
    </div>
  );
}