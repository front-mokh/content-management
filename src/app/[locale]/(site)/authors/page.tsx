// app/[locale]/authors/page.tsx
import { getAllAuthors } from "@/lib/services/authorService";
import AuthorsPage from "./AuthorsPage";
import { getDictionary } from "@/lib/i18n";

export default async function Authors({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const authors = await getAllAuthors();
  
  return (
    <div className="min-h-screen">
      <main>
        <AuthorsPage authors={authors} dictionary={dictionary} />
      </main>
    </div>
  );
}