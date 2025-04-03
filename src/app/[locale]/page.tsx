import { redirect } from "next/navigation";

export default async function Home({
  params,
}: Readonly<{ params: { locale: string } }>) {
  redirect(`/${params.locale}/home`);
}
