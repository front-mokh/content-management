import { getDictionary } from "@/lib/i18n";

export default async function Home({
  params,
}: Readonly<{ params: { locale: string } }>) {
  const dir = await getDictionary(params.locale);

  return <div></div>;
}
